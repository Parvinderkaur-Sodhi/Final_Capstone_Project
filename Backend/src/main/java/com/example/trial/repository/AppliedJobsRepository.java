package com.example.trial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.trial.models.AppliedJobs;
import com.example.trial.models.Jobs;

@Repository
@EnableJpaRepositories
	public interface AppliedJobsRepository extends JpaRepository<AppliedJobs, Integer>{
		// TODO Auto-generated constructor stub
AppliedJobs findByJobJobProfile(String profile);

    List<AppliedJobs>findAllByStatus(String status);
    List<AppliedJobs>findAllByEmpEmployeeId(int empId);
List<AppliedJobs>findAllByJobJobProfileAndStatus(String profile,String status);
	}
