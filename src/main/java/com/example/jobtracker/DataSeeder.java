package com.example.jobtracker;

import java.math.BigDecimal;
import com.example.jobtracker.entities.Job;
import com.example.jobtracker.entities.Stage;
import com.example.jobtracker.repositories.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final JobRepository jobRepository;
    private final BigDecimal b1 = new BigDecimal(35000.00);
    private final BigDecimal b2= new BigDecimal(34000.00);
    private final BigDecimal b3 = new BigDecimal(38000.00);

    public DataSeeder(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public void run(String... args) {
        if (jobRepository.count() == 0) { // Seed only if DB is empty
            Job job1 = new Job();
            job1.setCompany("OpenAI");
            job1.setJobDescription("AI Researcher");
            job1.setAppStage(Stage.APPLIED);
            job1.setUrl("https://openai.com/jobs/1");
            job1.setSalary(b1);

            Job job2 = new Job();
            job2.setCompany("Google");
            job2.setJobDescription("Software Engineer");
            job2.setAppStage(Stage.INTERVIEW);
            job2.setUrl("https://google.com/jobs/2");
            job2.setSalary(b2);

            Job job3 = new Job();
            job3.setCompany("Amazon");
            job3.setJobDescription("Cloud Architect");
            job3.setAppStage(Stage.SCREENING);
            job3.setUrl("https://amazon.com/jobs/3");
            job3.setSalary(b3);

            jobRepository.saveAll(List.of(job1, job2, job3));

            System.out.println("✅ Seeded sample jobs into database");
        }
    }
}
