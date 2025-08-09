package com.example.jobtracker.repositories;

import org.springframework.data.jpa.repository.*;
import com.example.jobtracker.entities.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
}
