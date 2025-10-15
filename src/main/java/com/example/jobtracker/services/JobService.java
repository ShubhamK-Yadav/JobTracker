package com.example.jobtracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.jobtracker.repositories.JobRepository;
import com.example.jobtracker.dtos.*;
import com.example.jobtracker.entities.Job;
import com.example.jobtracker.exceptions.JobNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {
    @Autowired
    private final JobRepository repository;

    public JobService (JobRepository repository) {
        this.repository = repository;
    }

    private JobResponseDTO convertToJobResponseDTO(Job job) {
        JobResponseDTO dto = new JobResponseDTO();

        dto.setId(job.getId());
        dto.setJobRole(job.getJobRole());
        dto.setCompany(job.getCompany());
        dto.setJobDescription(job.getJobDescription());
        dto.setAppStage(job.getAppStage());
        dto.setUrl(job.getUrl());
        dto.setSalary(job.getSalary());

        return dto;
    }

    private JobUpdateDTO convertToJobUpdateDTO(Job job) {
        JobUpdateDTO dto = new JobUpdateDTO();

        dto.setCompany(job.getCompany());
        dto.setJobRole(job.getJobRole());
        dto.setJobDescription(job.getJobDescription());
        dto.setAppStage(job.getAppStage());
        dto.setUrl(job.getUrl());
        dto.setSalary(job.getSalary());

        return dto;
    }

    private void mapJobCreateDTOtoJob(JobCreateDTO dto, Job job) {
        job.setCompany(dto.getCompany());
        job.setJobDescription(dto.getJobDescription());
        job.setJobRole(dto.getJobRole());
        job.setAppStage(dto.getAppStage());
        job.setUrl(dto.getUrl());
        job.setSalary(dto.getSalary());
    }
    
    private void mapJobUpdateDTOtoJob(JobUpdateDTO dto, Job job) {
        job.setCompany(dto.getCompany());
        job.setJobDescription(dto.getJobDescription());
        job.setJobRole(dto.getJobRole());
        job.setAppStage(dto.getAppStage());
        job.setUrl(dto.getUrl());
        job.setSalary(dto.getSalary());
    }
    
    public JobResponseDTO createJob(JobCreateDTO dto) {
        Job job = new Job();
        
        mapJobCreateDTOtoJob(dto, job);
        Job savedJob = repository.save(job);
        return convertToJobResponseDTO(savedJob);
    }

    public List<JobResponseDTO> getAllJobs() {
        // gets job entities using the repository interface and turns jobs to a list of DTOs
        return repository.findAll()
            .stream()
            .map(job -> convertToJobResponseDTO(job))
            .collect(Collectors.toList());
    }

    public JobResponseDTO getById(Long id) {
        /*
        * repository.findById(id) returns an Optional<Job> object != <Job> Object.
        * orElse: Return the value if present, otherwise return other
        * orElseThrow: Return the contained value, if present, otherwise throw an exception.
        */
        Job job = repository.findById(id)
            .orElseThrow(() -> new JobNotFoundException(id));

        return convertToJobResponseDTO(job);
    }

    public JobUpdateDTO updateJob(Long id, JobUpdateDTO dto) {
        Job job = repository.findById(id)
            .orElseThrow(() -> new JobNotFoundException(id));
        
        mapJobUpdateDTOtoJob(dto, job);
        Job updatedJob = repository.save(job);
        return convertToJobUpdateDTO(updatedJob);
    }

    public void deleteJob(Long id) {
        repository.deleteById(id);
    }
}
