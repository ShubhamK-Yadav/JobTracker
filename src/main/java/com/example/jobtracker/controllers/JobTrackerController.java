package com.example.jobtracker.controllers;

import java.util.List;
import com.example.jobtracker.dtos.JobCreateDTO;
import com.example.jobtracker.dtos.JobResponseDTO;
import com.example.jobtracker.services.JobService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api/jobs")
@CrossOrigin(origins="http://localhost:5173")
public class JobTrackerController {
    private final JobService service;
    private static final Logger logger = LoggerFactory.getLogger(JobTrackerController.class);

    JobTrackerController (JobService service){
        this.service= service;
    }

    @GetMapping
    public List<JobResponseDTO> getAllJobs(){
       return service.getAllJobs();
    }

    // Uses the service to create the dto required and returns a ResponseEntity for error catching
    @PostMapping("/create")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobCreateDTO dto){
        try {
            JobResponseDTO responseDTO = service.createJob(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);

        } catch (IllegalArgumentException e) {
            logger.warn("Invalid arguments when creating job: {}", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid arguments: " + e.getMessage());

        } catch (Exception e) {
            logger.error("Unexpected error: {}", e);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
