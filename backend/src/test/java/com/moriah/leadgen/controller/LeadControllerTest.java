package com.moriah.leadgen.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moriah.leadgen.dto.LeadRequestDto;
import com.moriah.leadgen.dto.LeadResponseDto;
import com.moriah.leadgen.service.LeadService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = LeadController.class)
@AutoConfigureMockMvc(addFilters = false) // Disable security filters for simple unit test
class LeadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeadService leadService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void submitLead_Success() throws Exception {
        LeadRequestDto requestDto = new LeadRequestDto();
        requestDto.setFullName("Jane Doe");
        requestDto.setEmail("jane@example.com");
        requestDto.setMobileNumber("9876543210");
        requestDto.setInterestedTechnology("Java");
        requestDto.setTrainingMode("Online");

        LeadResponseDto responseDto = LeadResponseDto.builder()
                .leadId(1L)
                .fullName("Jane Doe")
                .status("New")
                .build();

        when(leadService.createLead(any(LeadRequestDto.class))).thenReturn(responseDto);

        mockMvc.perform(post("/api/leads")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.message").value("Lead submitted successfully"))
                .andExpect(jsonPath("$.data.fullName").value("Jane Doe"))
                .andExpect(jsonPath("$.data.status").value("New"));
    }
}
