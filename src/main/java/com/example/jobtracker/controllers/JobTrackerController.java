package com.example.jobtracker.controllers;

import java.util.List;

import com.example.jobtracker.dtos.JobResponseDTO;
import com.example.jobtracker.services.JobService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
}
