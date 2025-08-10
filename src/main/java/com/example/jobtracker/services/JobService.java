package com.example.jobtracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.jobtracker.repositories.JobRepository;
import com.example.jobtracker.dtos.*;
import com.example.jobtracker.entities.Job;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {
   // Methods for:
   //     - Create Jobs
   //     - GetAllJobs
   //     - FindJobByID
   //     - Convert job to JobResponseDTO

    // The service should not talk to the database directly. The interactions should be through the interface.
    @Autowired
    private final JobRepository repository;

    public JobService (JobRepository repository) {
        this.repository = repository;
    }

    public JobResponseDTO createJobs(JobCreateDTO dto) {
        Job job = new Job();

        job.setCompany(dto.getCompany());
        job.setJobDescription(dto.getJobDescription());
        job.setAppStage(dto.getAppStage());
        job.setUrl(dto.getUrl());
        job.setSalary(dto.getSalary());

        Job savedJob = repository.save(job);
        return convertToJobResponseDTO(savedJob);
    }

    public List<JobResponseDTO> getAllJobs(){
        return repository.findAll()
            .stream()
            .map(job -> convertToJobResponseDTO(job))
            .collect(Collectors.toList());
    }

    public JobResponseDTO convertToJobResponseDTO(Job job) {
        JobResponseDTO dto = new JobResponseDTO();

        dto.setCompany(job.getCompany());
        dto.setJobDescription(job.getJobDescription());
        dto.setAppStage(job.getAppStage());
        dto.setUrl(job.getUrl());
        dto.setSalary(job.getSalary());

        return dto;
    }
}
