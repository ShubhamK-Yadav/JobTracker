package com.example.jobtracker.controllers;

import java.util.List;

import com.example.jobtracker.dtos.*;
import com.example.jobtracker.services.JobService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

@RestController
@Validated
@RequestMapping("/api/jobs")
@CrossOrigin(origins="http://localhost:5173")
public class JobTrackerController {
    private final JobService service;

    JobTrackerController (JobService service){
        this.service= service;
    }

    @GetMapping
    public List<JobResponseDTO> getAllJobs(){
       return service.getAllJobs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDTO> getJobById(@PathVariable Long id) {
        JobResponseDTO job = service.getById(id);
        return ResponseEntity.ok(job);
    }

    /**
     * Create a job but use Data Transfer Object to hide the raw values being inserted in db.
     * @param job create data transfer object
     * @return ResponseEntity - status code alongside the dto object itself
     */
    @PostMapping
    public ResponseEntity<JobResponseDTO> createJob(@Valid @RequestBody JobCreateDTO dto){
        JobResponseDTO responseDTO = service.createJob(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(responseDTO);
    }

    /**
     * Update job with id using the service method.
     * @param id of job
     * @param dto of job to update
     * @return ResponseEntity ok status
     */
    @PutMapping("/{id}")
    public ResponseEntity<JobUpdateDTO> updateJob(@PathVariable Long id, @Valid @RequestBody JobUpdateDTO dto) {
        JobUpdateDTO updatedJob = service.updateJob(id, dto);
        return ResponseEntity.ok(updatedJob);
    }

    /**
     * Delete job with id.
     * @param id of job
     * @return ResponseEntity no content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        service.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
