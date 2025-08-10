package com.example.jobtracker.dtos;

import com.example.jobtracker.entities.Stage;
import java.math.BigDecimal;
import jakarta.validation.constraints.NotNull;
// This DTO is used to create the job entity to create jobs in the db.
public class JobResponseDTO {

    private String company;
    private String jobDescription;
    private Stage appStage;
    private String url;
    private BigDecimal salary;

    public String getCompany() {
        return company;
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


}
