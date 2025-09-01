package com.example.jobtracker.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import com.example.jobtracker.entities.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCompany(String company);
    List<Job> findByJobRole(String jobRole);
}
