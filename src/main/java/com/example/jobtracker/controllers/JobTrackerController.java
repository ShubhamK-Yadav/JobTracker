package com.example.jobtracker.controllers;

import java.util.List;
import com.example.jobtracker.dtos.JobCreateDTO;
import com.example.jobtracker.dtos.JobResponseDTO;
import com.example.jobtracker.services.JobService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/apis/jobs")
public class JobTrackerController {
    private final JobService service;

    JobTrackerController (JobService service){
        this.service= service;
    }

    @GetMapping
    public List<JobResponseDTO> getAllJobs(){
       return service.getAllJobs();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobCreateDTO dto){
        try {
            JobResponseDTO responseDTO = service.createJob(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid arguments: " + e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
