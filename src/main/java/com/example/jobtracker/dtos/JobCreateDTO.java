package com.example.jobtracker.dtos;

import com.example.jobtracker.entities.Stage;
import java.math.BigDecimal;
// This DTO is used to create the job entity to create jobs in the db.
public class JobCreateDTO{

    @NotNull
    private String company;

    @NotNull
    private String jobDescription;

    @NotNull
    private Stage appStage;

    @NotNull
    private String url;

    @NotNull
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
