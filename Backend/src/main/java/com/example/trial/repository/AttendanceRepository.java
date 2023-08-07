package com.example.trial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.trial.models.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
	List<Attendance> findByEmployeeEmployeeId(int employeeId);

}
