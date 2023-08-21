package com.example.trial.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.trial.models.Jobs;
import com.example.trial.repository.JobRepository;

@Service
public interface JobService {
    List<Jobs> getAllJobs();

    Jobs getJobById(int JobId);
    
    List<Jobs> getJobByJobProfile(String profile);

    List<Jobs> getJobByJobType(String jobtype);
    List<Jobs> getJobByCategory(String category);

List<Jobs>getSalaryRangeJobs(int min,int max);
    Jobs saveJob(Jobs Job);

    Jobs updateJob(int JobId, Jobs Job);

    void deleteJob(int JobId);
}



