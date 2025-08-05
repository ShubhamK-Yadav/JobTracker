package com.example.jobtracker.entities;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;

@Entity
public class Job {
    private Long id;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String jobDescription;

    @Column(nullable = false)
    private Stage appStage;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private float salary;

}
