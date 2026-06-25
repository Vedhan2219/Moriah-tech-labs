package com.moriah.leadgen.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LeadStatusUpdateDto {
    @NotBlank(message = "Status is required")
    private String status;
}
