package com.moriah.leadgen.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "leads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lead_id")
    private Long leadId;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "mobile_number", nullable = false, length = 20)
    private String mobileNumber;

    @Column(name = "qualification", length = 100)
    private String qualification;

    @Column(name = "interested_technology", length = 100)
    private String interestedTechnology;

    @Column(name = "training_mode", length = 50)
    private String trainingMode;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "source", length = 100)
    @Builder.Default
    private String source = "Website";

    @Column(name = "status", length = 50)
    @Builder.Default
    private String status = "New";

    @Column(name = "assigned_counselor", length = 100)
    @Builder.Default
    private String assignedCounselor = "Sarah Jenkins";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
