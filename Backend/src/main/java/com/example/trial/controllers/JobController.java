package com.example.trial.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.trial.custom.ResourceNotFoundException;
import com.example.trial.models.Jobs;
import com.example.trial.service.JobService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/Jobs")
public class JobController {

    private final JobService JobService;

    @Autowired
    public JobController(JobService JobService) {
        this.JobService = JobService;
    }

    //List of Jobs
    @GetMapping("/viewJob")
    public List<Jobs> getAllJobs() {
    	System.out.print("helii");
        return JobService.getAllJobs();
    }

    //GetJobById
    @GetMapping("/viewJob/{JobId}")
    @ResponseStatus(HttpStatus.OK)
    public Jobs getJobById(@PathVariable int JobId) {
        Jobs Job = JobService.getJobById(JobId);
        if (Job == null) {
            throw new ResourceNotFoundException("Job not found with ID: " + JobId);
        }
        return Job;
    }
    
    //search Job by Profile
    @GetMapping("/viewJobProfile/{JobProfile}")
    @ResponseStatus(HttpStatus.OK)
    public List<Jobs> getJobByProfile(@PathVariable String JobProfile) {
        List<Jobs> Job = JobService.getJobByJobProfile(JobProfile);
        if (Job == null) {
            throw new ResourceNotFoundException("Job Type not found: " + JobProfile);
        }
        return Job;
    }

  //search Job by category
    @GetMapping("/viewByJobType/{JobType}")
    @ResponseStatus(HttpStatus.OK)
    public List<Jobs> getJobByType(@PathVariable String JobType) {
        List<Jobs> Job = JobService.getJobByJobType(JobType);
        if (Job == null) {
            throw new ResourceNotFoundException("Job Type not found: " + JobType);
        }
        return Job;
    }
    
    @GetMapping("/viewByJobCategory/{category}")
    @ResponseStatus(HttpStatus.OK)
    public List<Jobs> getJobByCategory(@PathVariable String category) {
        List<Jobs> Job = JobService.getJobByCategory(category);
        if (Job == null) {
            throw new ResourceNotFoundException("Job Type not found: " + category);
        }
        return Job;
    }

    //Add new Job
    @PostMapping("/postJob")
    public Jobs saveJob(@RequestBody Jobs Job) {
        return JobService.saveJob(Job);
    }

    //edit job details
    @PutMapping("/update/{JobId}")
    public Jobs updateJob(@PathVariable int JobId, @RequestBody Jobs Job) {
        return JobService.updateJob(JobId, Job);
    }

    //delete job
    @DeleteMapping("/delete/{JobId}")
    public void deleteJob(@PathVariable int JobId) {
        JobService.deleteJob(JobId);
    }
    
    @GetMapping("/Salary/{min}/{max}")
    public List<Jobs> getJobBySalary(@PathVariable int min,@PathVariable int max) {
        System.out.println(min);

        List<Jobs> Job = JobService.getSalaryRangeJobs(min, max);
        System.out.print(Job);
        if (Job == null) {
            throw new ResourceNotFoundException("Job Type not found: " );
        }
        return Job;
    }
    
    @GetMapping("/experience/{exp}")
    public List<Jobs> getJobByExperience(@PathVariable int exp) {
    	return JobService.getJobByExperience(exp);
    }
    }
