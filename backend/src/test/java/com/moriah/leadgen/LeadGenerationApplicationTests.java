package com.moriah.leadgen;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // Use a test profile to avoid MySQL connection issues if db isn't running
class LeadGenerationApplicationTests {

    @Test
    void contextLoads() {
        // This test simply starts the Spring context to ensure there are no configuration errors.
    }
}
