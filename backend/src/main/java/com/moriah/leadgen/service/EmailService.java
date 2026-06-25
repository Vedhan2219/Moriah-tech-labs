package com.moriah.leadgen.service;

import com.moriah.leadgen.entity.Lead;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Send a thank-you confirmation email to the lead.
     * Runs asynchronously so it never blocks lead saving.
     */
    @Async
    public void sendLeadConfirmationEmail(Lead lead) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(fromEmail);
            msg.setTo(lead.getEmail());
            msg.setSubject("Thank you for showing interest in Moriah Tech Labs!");
            msg.setText(buildConfirmationBody(lead));
            mailSender.send(msg);
            log.info("Confirmation email sent to {}", lead.getEmail());
        } catch (Exception e) {
            // Log but never let email failure block lead saving
            log.warn("Failed to send confirmation email to {}: {}", lead.getEmail(), e.getMessage());
        }
    }

    /**
     * Notify admin about a new lead.
     */
    @Async
    public void sendAdminNotificationEmail(Lead lead) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(fromEmail);
            msg.setTo(fromEmail); // admin inbox = same sender address by default
            msg.setSubject("[New Lead] " + lead.getFullName() + " – " + lead.getInterestedTechnology());
            msg.setText(buildAdminNotificationBody(lead));
            mailSender.send(msg);
            log.info("Admin notification sent for lead: {}", lead.getFullName());
        } catch (Exception e) {
            log.warn("Failed to send admin notification for lead {}: {}", lead.getLeadId(), e.getMessage());
        }
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    private String buildConfirmationBody(Lead lead) {
        return String.format("""
                Hi %s,
                
                Thank you for reaching out to Moriah Tech Labs!
                
                We have received your request for our Project Training Program. \
                A dedicated counselor has been assigned to your profile and will connect with you \
                on %s or via email within the next 24 hours to guide you through your selected track: %s (%s).
                
                In the meantime, feel free to review our curriculum and check out live systems \
                created by our former graduates at https://moriahtechlabs.com
                
                Regards,
                Moriah Tech Labs Admissions Team
                support@moriahtechlabs.com
                """,
                lead.getFullName(),
                lead.getMobileNumber(),
                lead.getInterestedTechnology(),
                lead.getTrainingMode()
        );
    }

    private String buildAdminNotificationBody(Lead lead) {
        return String.format("""
                New Lead Received – %s
                
                Name         : %s
                Email        : %s
                Phone        : %s
                Qualification: %s
                Technology   : %s
                Mode         : %s
                Source       : %s
                Message      : %s
                
                Log in to the admin portal to view and follow up.
                """,
                lead.getCreatedAt(),
                lead.getFullName(),
                lead.getEmail(),
                lead.getMobileNumber(),
                lead.getQualification(),
                lead.getInterestedTechnology(),
                lead.getTrainingMode(),
                lead.getSource(),
                lead.getMessage()
        );
    }
}
