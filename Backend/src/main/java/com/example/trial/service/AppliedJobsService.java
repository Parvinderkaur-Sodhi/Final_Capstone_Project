package com.example.trial.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.trial.models.AppliedJobs;
import com.example.trial.models.Jobs;

@Service
public interface AppliedJobsService {
    List<AppliedJobs> getAllAppliedJobs();

    AppliedJobs getJobById(int applicationno);
    
    AppliedJobs getJobByJobProfile(String profile);


    List<AppliedJobs> getJobByJobStatus(String status);

    AppliedJobs applyForJob(int empId,int JobId,AppliedJobs Job);

    AppliedJobs updateStatus(int applicationno, AppliedJobs Job);

//    void deleteJob(int JobId);
}