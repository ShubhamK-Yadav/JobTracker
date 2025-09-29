package com.example.jobtracker.dtos;

import com.example.jobtracker.entities.Stage;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
* Data Transfer Object used when updating Jobs.
* Prevents exposing of direct data from the db.
*/
public class JobUpdateDTO {
    private String company;
    private String jobRole;
    private String jobDescription;
    private Stage appStage;
    private String url;
    private BigDecimal salary;
    private LocalDateTime updatedAt;

    public String getCompany() {
        return company;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public Stage getAppStage() {
        return appStage;
    }

    public void setAppStage(Stage appStage) {
        this.appStage = appStage;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}
