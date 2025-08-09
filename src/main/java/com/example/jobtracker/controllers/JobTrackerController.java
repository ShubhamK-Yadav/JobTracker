package com.example.jobtracker.controllers;

import java.util.List;
import com.example.jobtracker.entities.Job;
import com.example.jobtracker.repositories.JobRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/apis/jobs")
public class JobTrackerController {
    private final JobRepository repository;

    JobTrackerController (JobRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<Job> getAllJobs(){
       return repository.findAll();
    }
}
