package com.example.trial.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.trial.models.AppliedJobs;
import com.example.trial.models.Employee;
import com.example.trial.models.Jobs;
import com.example.trial.repository.AppliedJobsRepository;
import com.example.trial.repository.JobRepository;
import com.example.trial.service.AppliedJobsService;
import com.example.trial.service.EmployeeService;
import com.example.trial.service.JobService;

@Service
public class AppliedJobsServiceImpl implements AppliedJobsService{

	@Autowired
	private JobService jobservice;
		
	@Autowired
	private EmployeeService empservice;
		 private final AppliedJobsRepository appliedjobrepo;

		    @Autowired
		    public AppliedJobsServiceImpl(AppliedJobsRepository JobRepository) {
		        this.appliedjobrepo = JobRepository;
		    }

			@Override
			public List<AppliedJobs> getAllAppliedJobs() {
				return appliedjobrepo.findAll();
			}

			@Override
			public AppliedJobs getJobById(int applicationno) {
				 return appliedjobrepo.findById(applicationno).orElse(null);

			}

			@Override
			public AppliedJobs applyForJob(int empId,int jobId,AppliedJobs appliedJob) {
				Jobs job=jobservice.getJobById(jobId);
				Employee emp=empservice.getEmployeeById(empId);
				List<AppliedJobs>appliedjoblist=appliedjobrepo.findAll();
				for(int i=0; i<appliedjoblist.size(); i++)  {
					AppliedJobs appliedjob=appliedjoblist.get(i);
				if(appliedjob.getJobId()==job.getJobId() && appliedjob.getEmp().getEmployeeId()==emp.getEmployeeId()) {
					return null;
				}
				}
					appliedJob.setJobId(job.getJobId());
				appliedJob.setRole(job.getJobProfile());
				appliedJob.setDescription(job.getDescription());
				appliedJob.setStatus("inprocess");
				appliedJob.setEmp(emp);
				 return appliedjobrepo.save(appliedJob);

			}

			@Override
			public AppliedJobs updateStatus(int applicationno, AppliedJobs Job) {
				// TODO Auto-generated method stub
				 AppliedJobs existingappliedjob = appliedjobrepo.findById(applicationno).orElse(null);
			        if (existingappliedjob != null) {
			            // Update properties of existingJobs using jobs object
			            existingappliedjob.setStatus(Job.getStatus());		
			            return appliedjobrepo.save(existingappliedjob);
			            }
			        return null;
			}

			@Override
			public AppliedJobs getJobByJobProfile(String profile) {
				 AppliedJobs credentials = appliedjobrepo.getJobByRole(profile);

				   return credentials;
			}

			

			@Override
			public List<AppliedJobs> getJobByJobStatus(String status) {
				List<AppliedJobs> credentials = appliedjobrepo.findAllByStatus(status);

				   return credentials;
			}

			        
			
		
	}


