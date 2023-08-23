package com.example.trial.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.trial.models.Jobs;
import com.example.trial.models.Jobs;
import com.example.trial.repository.JobRepository;
import com.example.trial.service.JobService;
import com.example.trial.service.JobService;
import com.example.trial.repository.JobRepository;

@Service
public class JobServiceImpl implements JobService{

	
		
		 private final JobRepository jobrepo;

		    @Autowired
		    public JobServiceImpl(JobRepository JobRepository) {
		        this.jobrepo = JobRepository;
		    }

			@Override
			public List<Jobs> getAllJobs() {
				 return jobrepo.findAll();
			}

			@Override
			public Jobs getJobById(int JobId) {
				 return jobrepo.findById(JobId).orElse(null);
			}

			@Override
			public List<Jobs> getJobByJobProfile(String profile) {
				 List<Jobs> credentials = jobrepo.getJobByJobProfile(profile);

				   return credentials;
			}

			@Override
			public List<Jobs> getJobByJobType(String type) {
				 List<Jobs> credentials = jobrepo.getJobByJobType(type);

				   return credentials;
			}

			@Override
			public Jobs saveJob(Jobs Job) {
				 return jobrepo.save(Job);
			}

			@Override
			public Jobs updateJob(int JobId, Jobs Job) {
				 Jobs existingjob = jobrepo.findById(JobId).orElse(null);
			        if (existingjob != null) {
			            // Update properties of existingJobs using jobs object
			            existingjob.setJobProfile(Job.getJobProfile());
			            existingjob.setVacancy(Job.getVacancy());
			            existingjob.setDescription(Job.getDescription());
			            existingjob.setJobType(Job.getJobType());
			            existingjob.setSalary(Job.getSalary());
existingjob.setLastdate(Job.getLastdate());
			            return jobrepo.save(existingjob);
			        }
			        return null;
			}

			@Override
			public void deleteJob(int JobId) {
		        jobrepo.deleteById(JobId);
				
			}

			@Override
			public List<Jobs> getSalaryRangeJobs(int min, int max) {
				// TODO Auto-generated method stub
				return jobrepo.findBySalaryBetween(min, max);
				
			}

			@Override
			public List<Jobs> getJobByCategory(String category) {
				// TODO Auto-generated method stub
				 List<Jobs> credentials = jobrepo.getJobByCategory(category);

				   return credentials;
				   }

			@Override
			public List<Jobs> getJobByExperience(int exp) {
				// TODO Auto-generated method stub
				return jobrepo.getJobByExperience(exp);
			}

			@Override
			public List<Jobs> getJobByPosition(String positio) {
				// TODO Auto-generated method stub
				return jobrepo.getJobByPosition(positio);
			}

		    
	}


