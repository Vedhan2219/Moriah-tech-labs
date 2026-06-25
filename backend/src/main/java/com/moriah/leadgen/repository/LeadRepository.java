package com.moriah.leadgen.repository;

import com.moriah.leadgen.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    // Search by technology and training mode
    List<Lead> findByInterestedTechnologyContainingIgnoreCaseAndTrainingModeContainingIgnoreCase(
            String technology, String trainingMode);

    // Filter by status
    List<Lead> findByStatus(String status);

    // Filter by technology
    List<Lead> findByInterestedTechnologyContainingIgnoreCase(String technology);

    // Filter by date range
    List<Lead> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // Full flexible search
    @Query("SELECT l FROM Lead l WHERE " +
           "(:technology IS NULL OR LOWER(l.interestedTechnology) LIKE LOWER(CONCAT('%', :technology, '%'))) AND " +
           "(:trainingMode IS NULL OR LOWER(l.trainingMode) LIKE LOWER(CONCAT('%', :trainingMode, '%'))) AND " +
           "(:status IS NULL OR l.status = :status) AND " +
           "(:startDate IS NULL OR l.createdAt >= :startDate) AND " +
           "(:endDate IS NULL OR l.createdAt <= :endDate) " +
           "ORDER BY l.createdAt DESC")
    List<Lead> searchLeads(
            @Param("technology") String technology,
            @Param("trainingMode") String trainingMode,
            @Param("status") String status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    // Dashboard stats
    long countByStatus(String status);

    @Query("SELECT COUNT(l) FROM Lead l WHERE l.createdAt >= :start AND l.createdAt <= :end")
    long countByCreatedAtBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
