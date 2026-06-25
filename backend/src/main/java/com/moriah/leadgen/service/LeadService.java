package com.moriah.leadgen.service;

import com.moriah.leadgen.dto.LeadRequestDto;
import com.moriah.leadgen.dto.LeadResponseDto;
import com.moriah.leadgen.entity.Lead;
import com.moriah.leadgen.exception.LeadNotFoundException;
import com.moriah.leadgen.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeadService {

    private final LeadRepository leadRepository;
    private final EmailService emailService;

    // ─── Public Lead Submission ───────────────────────────────────────────────

    @Transactional
    public LeadResponseDto createLead(LeadRequestDto dto) {
        Lead lead = Lead.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .mobileNumber(dto.getMobileNumber())
                .qualification(dto.getQualification())
                .interestedTechnology(dto.getInterestedTechnology())
                .trainingMode(dto.getTrainingMode())
                .message(dto.getMessage())
                .source("Website")
                .status("New")
                .assignedCounselor("Sarah Jenkins")
                .build();

        Lead saved = leadRepository.save(lead);
        log.info("Lead created: id={}, name={}", saved.getLeadId(), saved.getFullName());

        // Fire-and-forget emails (async – won't block the response)
        emailService.sendLeadConfirmationEmail(saved);
        emailService.sendAdminNotificationEmail(saved);

        return toDto(saved);
    }

    // ─── Admin: Read ──────────────────────────────────────────────────────────

    public List<LeadResponseDto> getAllLeads() {
        return leadRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public LeadResponseDto getLeadById(Long id) {
        return toDto(findOrThrow(id));
    }

    public List<LeadResponseDto> searchLeads(String technology, String trainingMode,
                                              String status, String startDate, String endDate) {
        LocalDateTime start = startDate != null ? LocalDate.parse(startDate).atStartOfDay() : null;
        LocalDateTime end   = endDate   != null ? LocalDate.parse(endDate).atTime(23, 59, 59) : null;

        return leadRepository.searchLeads(technology, trainingMode, status, start, end)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    // ─── Admin: Update ────────────────────────────────────────────────────────

    @Transactional
    public LeadResponseDto updateStatus(Long id, String status) {
        Lead lead = findOrThrow(id);
        lead.setStatus(status);
        return toDto(leadRepository.save(lead));
    }

    @Transactional
    public LeadResponseDto updateLead(Long id, LeadRequestDto dto) {
        Lead lead = findOrThrow(id);
        lead.setFullName(dto.getFullName());
        lead.setEmail(dto.getEmail());
        lead.setMobileNumber(dto.getMobileNumber());
        lead.setQualification(dto.getQualification());
        lead.setInterestedTechnology(dto.getInterestedTechnology());
        lead.setTrainingMode(dto.getTrainingMode());
        lead.setMessage(dto.getMessage());
        return toDto(leadRepository.save(lead));
    }

    @Transactional
    public void deleteLead(Long id) {
        leadRepository.delete(findOrThrow(id));
    }

    // ─── Dashboard Stats ──────────────────────────────────────────────────────

    public Map<String, Object> getDashboardStats() {
        long total        = leadRepository.count();
        long newLeads     = leadRepository.countByStatus("New");
        long converted    = leadRepository.countByStatus("Converted");
        long contacted    = leadRepository.countByStatus("Contacted");
        long qualified    = leadRepository.countByStatus("Qualified");
        long closed       = leadRepository.countByStatus("Closed");

        LocalDateTime todayStart  = LocalDate.now().atStartOfDay();
        LocalDateTime monthStart  = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime now         = LocalDateTime.now();

        long todayLeads   = leadRepository.countByCreatedAtBetween(todayStart, now);
        long monthlyLeads = leadRepository.countByCreatedAtBetween(monthStart, now);

        double conversionRate = total > 0 ? Math.round((converted * 100.0 / total) * 10.0) / 10.0 : 0.0;

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalLeads",     total);
        stats.put("newLeads",       newLeads);
        stats.put("contacted",      contacted);
        stats.put("qualified",      qualified);
        stats.put("converted",      converted);
        stats.put("closed",         closed);
        stats.put("todayLeads",     todayLeads);
        stats.put("monthlyLeads",   monthlyLeads);
        stats.put("conversionRate", conversionRate);
        return stats;
    }

    // ─── CSV Export ───────────────────────────────────────────────────────────

    public String exportToCsv() {
        List<Lead> leads = leadRepository.findAll();
        StringBuilder sb = new StringBuilder();
        sb.append("ID,Full Name,Email,Mobile,Qualification,Technology,Training Mode,Status,Source,Created At\n");
        for (Lead l : leads) {
            sb.append(String.format("%d,\"%s\",\"%s\",%s,\"%s\",\"%s\",%s,%s,%s,%s\n",
                    l.getLeadId(),
                    l.getFullName(),
                    l.getEmail(),
                    l.getMobileNumber(),
                    l.getQualification() != null ? l.getQualification() : "",
                    l.getInterestedTechnology() != null ? l.getInterestedTechnology() : "",
                    l.getTrainingMode() != null ? l.getTrainingMode() : "",
                    l.getStatus(),
                    l.getSource(),
                    l.getCreatedAt()
            ));
        }
        return sb.toString();
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private Lead findOrThrow(Long id) {
        return leadRepository.findById(id)
                .orElseThrow(() -> new LeadNotFoundException("Lead not found with id: " + id));
    }

    private LeadResponseDto toDto(Lead lead) {
        return LeadResponseDto.builder()
                .leadId(lead.getLeadId())
                .fullName(lead.getFullName())
                .email(lead.getEmail())
                .mobileNumber(lead.getMobileNumber())
                .qualification(lead.getQualification())
                .interestedTechnology(lead.getInterestedTechnology())
                .trainingMode(lead.getTrainingMode())
                .message(lead.getMessage())
                .source(lead.getSource())
                .status(lead.getStatus())
                .assignedCounselor(lead.getAssignedCounselor())
                .createdAt(lead.getCreatedAt())
                .updatedAt(lead.getUpdatedAt())
                .build();
    }
}
