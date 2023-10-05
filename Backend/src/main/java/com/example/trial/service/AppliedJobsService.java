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
 List<AppliedJobs>getJobByIdAndStatus(int id,String status);
      
    List<AppliedJobs> getJobByJobStatus(String status);
    List<AppliedJobs> AppliedJobsforEmp(int empId);
    List<AppliedJobs> getJobByProfileAndStatus(String profile,String status);

    AppliedJobs applyForJob(int empId,int JobId,AppliedJobs Job);


	AppliedJobs updateStatus(int applicationno, AppliedJobs job);

//    void deleteJob(int JobId);
}