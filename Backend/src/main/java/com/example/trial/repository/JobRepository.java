package com.example.trial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.trial.models.Jobs;

@Repository
@EnableJpaRepositories
	public interface JobRepository extends JpaRepository<Jobs, Integer>{
		// TODO Auto-generated constructor stub
	List<Jobs> getJobByJobProfile(String profile);

    List<Jobs> getJobByCategory(String category);
    List<Jobs>findBySalaryBetween(int min,int max);
    List<Jobs> getJobByJobType(String jobtype);

	}


