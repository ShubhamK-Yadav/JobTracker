package com.example.jobtracker.exceptions;

import java.time.LocalDateTime;

public class ErrorResponse {
    private int statusCode;
    private String errMessage;
    private LocalDateTime timestamp;

    public ErrorResponse(int statusCode, String errMessage) {
        this.statusCode = statusCode;
        this.errMessage = errMessage;
        this.timestamp = LocalDateTime.now();
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getErrMessage() {
        return errMessage;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
