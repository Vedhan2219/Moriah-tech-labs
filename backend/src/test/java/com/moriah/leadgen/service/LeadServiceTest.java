package com.moriah.leadgen.service;

import com.moriah.leadgen.dto.LeadRequestDto;
import com.moriah.leadgen.dto.LeadResponseDto;
import com.moriah.leadgen.entity.Lead;
import com.moriah.leadgen.repository.LeadRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeadServiceTest {

    @Mock
    private LeadRepository leadRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private LeadService leadService;

    private LeadRequestDto sampleRequest;
    private Lead sampleLead;

    @BeforeEach
    void setUp() {
        sampleRequest = new LeadRequestDto();
        sampleRequest.setFullName("John Doe");
        sampleRequest.setEmail("john@example.com");
        sampleRequest.setMobileNumber("1234567890");

        sampleLead = Lead.builder()
                .leadId(1L)
                .fullName("John Doe")
                .email("john@example.com")
                .mobileNumber("1234567890")
                .status("New")
                .build();
    }

    @Test
    void createLead_Success() {
        when(leadRepository.save(any(Lead.class))).thenReturn(sampleLead);

        LeadResponseDto response = leadService.createLead(sampleRequest);

        assertNotNull(response);
        assertEquals("John Doe", response.getFullName());
        assertEquals("New", response.getStatus());

        verify(leadRepository, times(1)).save(any(Lead.class));
        verify(emailService, times(1)).sendLeadConfirmationEmail(any(Lead.class));
        verify(emailService, times(1)).sendAdminNotificationEmail(any(Lead.class));
    }
}
