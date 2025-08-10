package com.example.jobtracker.repositories;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import com.example.jobtracker.entities.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
}
