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
import com.example.trial.models.AppliedJobs;
import com.example.trial.service.AppliedJobsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/AppliedJobs")
public class AppliedJobsController {

    private final AppliedJobsService AppliedJobsService;

    @Autowired
    public AppliedJobsController(AppliedJobsService AppliedJobsService) {
        this.AppliedJobsService = AppliedJobsService;
    }

    //List of AppliedJobss
    @GetMapping("/view")
    public List<AppliedJobs> getAllAppliedJobs() {
        return AppliedJobsService.getAllAppliedJobs();
    }

    //GetAppliedJobsById
    @GetMapping("/getById/{AppliedJobsId}")
    @ResponseStatus(HttpStatus.OK)
    public AppliedJobs getAppliedJobsById(@PathVariable int AppliedJobsId) {
        AppliedJobs AppliedJobs = AppliedJobsService.getJobById(AppliedJobsId);
        if (AppliedJobs == null) {
            throw new ResourceNotFoundException("AppliedJobs not found with ID: " + AppliedJobsId);
        }
        return AppliedJobs;
    }
    
    //search AppliedJobs by Profile
    @GetMapping("/searchByprofile/{AppliedJobsProfile}")
    @ResponseStatus(HttpStatus.OK)
    public AppliedJobs getAppliedJobsByProfile(@PathVariable String AppliedJobsProfile) {
        AppliedJobs AppliedJobs = AppliedJobsService.getJobByJobProfile(AppliedJobsProfile);
        if (AppliedJobs == null) {
            throw new ResourceNotFoundException("AppliedJobs Type not found: " + AppliedJobsProfile);
        }
        return AppliedJobs;
    }

    //get by status
    @GetMapping("/searchByStatus/{AppliedJobStatus}")
    @ResponseStatus(HttpStatus.OK)
    public List<AppliedJobs> getAppliedJobsByStatus(@PathVariable String AppliedJobStatus) {
        List<AppliedJobs> AppliedJobs = AppliedJobsService.getJobByJobStatus(AppliedJobStatus);
        if (AppliedJobs == null) {
            throw new ResourceNotFoundException("AppliedJobs Type not found: " + AppliedJobStatus);
        }
        return AppliedJobs;
    }

    //Add new AppliedJobs
    @PostMapping("/apply/{empId}/{JobId}")
    public AppliedJobs saveAppliedJobs(@PathVariable int empId,@PathVariable int JobId,@RequestBody AppliedJobs AppliedJobs) {
        return AppliedJobsService.applyForJob(empId,JobId,AppliedJobs);
    }

    //edit AppliedJobs details
    @PutMapping("/updateStatus/{AppliedJobId}/{status}")
    public AppliedJobs updateAppliedJobs(@PathVariable int AppliedJobId, @PathVariable String status) {
        return AppliedJobsService.updateStatus(AppliedJobId, status);
    }


    @GetMapping("/viewByEmp/{empId}")
    public List<AppliedJobs> viewAppliedJobsforEmp(@PathVariable int empId) {
        return AppliedJobsService.AppliedJobsforEmp(empId);
    }
}
