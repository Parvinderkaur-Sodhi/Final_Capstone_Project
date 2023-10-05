package com.example.trial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.trial.models.Attendance;
import com.example.trial.models.Attendance.ApprovalStatus;

@Repository
@EnableJpaRepositories
public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
	List<Attendance> findByEmployeeEmployeeId(int employeeId);
	 List<Attendance> findByApprovalStatus(ApprovalStatus approvalStatus);
	

}
