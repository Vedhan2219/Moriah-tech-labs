package com.moriah.leadgen.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LeadResponseDto {
    private Long leadId;
    private String fullName;
    private String email;
    private String mobileNumber;
    private String qualification;
    private String interestedTechnology;
    private String trainingMode;
    private String message;
    private String source;
    private String status;
    private String assignedCounselor;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
