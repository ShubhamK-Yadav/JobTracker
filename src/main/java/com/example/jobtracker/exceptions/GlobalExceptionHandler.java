package com.example.jobtracker.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Specifically handles controller exceptions of JobNotFound
     * @param job not found exception
     * @return response entity with metadata: status code, error message and datetime
     */
    @ExceptionHandler(JobNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleJobNotFound(JobNotFoundException e) {
        logger.error("Job not found: {}", e);
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(), "Error: " + e.getMessage()));
    }

    /**
     * Handles controller Illegal argument exceptions
     * @param any illegal argument exception
     * @return response entity with metadata: status code, error message and datetime
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(IllegalArgumentException e) {
        logger.warn("Bad request: {}", e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Error: " + e.getMessage()));
    }

    /**
     * Handles any other controller exceptions not handled by the above exception handlers.
     * @param any exception
     * @return response entity with metadata: status code, error message and datetime
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception e) {
        logger.error("Unexpected error: {}", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Unexpected Error: " + e.getMessage()));
    }
}
