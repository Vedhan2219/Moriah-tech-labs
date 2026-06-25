package com.moriah.leadgen.controller;

import com.moriah.leadgen.dto.ApiResponse;
import com.moriah.leadgen.dto.LeadResponseDto;
import com.moriah.leadgen.dto.LeadStatusUpdateDto;
import com.moriah.leadgen.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminLeadController {

    private final LeadService leadService;

    // GET /api/admin/dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success("Dashboard stats", leadService.getDashboardStats()));
    }

    // GET /api/admin/leads
    @GetMapping("/leads")
    public ResponseEntity<ApiResponse<List<LeadResponseDto>>> getAllLeads() {
        return ResponseEntity.ok(ApiResponse.success("Leads fetched", leadService.getAllLeads()));
    }

    // GET /api/admin/leads/{id}
    @GetMapping("/leads/{id}")
    public ResponseEntity<ApiResponse<LeadResponseDto>> getLead(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Lead found", leadService.getLeadById(id)));
    }

    // GET /api/admin/leads/search?technology=Java&trainingMode=Online&status=New&startDate=2026-01-01&endDate=2026-12-31
    @GetMapping("/leads/search")
    public ResponseEntity<ApiResponse<List<LeadResponseDto>>> searchLeads(
            @RequestParam(required = false) String technology,
            @RequestParam(required = false) String trainingMode,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        return ResponseEntity.ok(ApiResponse.success("Search results",
                leadService.searchLeads(technology, trainingMode, status, startDate, endDate)));
    }

    // PATCH /api/admin/leads/{id}/status
    @PatchMapping("/leads/{id}/status")
    public ResponseEntity<ApiResponse<LeadResponseDto>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody LeadStatusUpdateDto dto) {

        return ResponseEntity.ok(ApiResponse.success("Status updated",
                leadService.updateStatus(id, dto.getStatus())));
    }

    // DELETE /api/admin/leads/{id}
    @DeleteMapping("/leads/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.ok(ApiResponse.success("Lead deleted", null));
    }

    // GET /api/admin/leads/export  →  CSV download
    @GetMapping("/leads/export")
    public ResponseEntity<byte[]> exportLeads() {
        String csv = leadService.exportToCsv();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("attachment", "leads_export.csv");
        return ResponseEntity.ok().headers(headers).body(csv.getBytes());
    }
}
