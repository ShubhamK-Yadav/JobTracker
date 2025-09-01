package com.example.jobtracker.exceptions;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(Long id) {
        super("Job with id: " + id + " not found!");
    }

    public JobNotFoundException(String message){
        super(message);
    }
}
