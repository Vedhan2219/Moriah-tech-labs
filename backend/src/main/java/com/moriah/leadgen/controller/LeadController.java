package com.moriah.leadgen.controller;

import com.moriah.leadgen.dto.ApiResponse;
import com.moriah.leadgen.dto.LeadRequestDto;
import com.moriah.leadgen.dto.LeadResponseDto;
import com.moriah.leadgen.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    /**
     * POST /api/leads
     * Public endpoint – called from the landing page form.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<LeadResponseDto>> submitLead(
            @Valid @RequestBody LeadRequestDto dto) {

        LeadResponseDto created = leadService.createLead(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Lead submitted successfully", created));
    }
}
