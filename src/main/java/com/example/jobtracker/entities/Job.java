package com.example.jobtracker.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
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
