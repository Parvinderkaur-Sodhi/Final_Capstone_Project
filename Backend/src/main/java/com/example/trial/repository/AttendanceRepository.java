package com.example.trial.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.trial.models.Attendance;

@Repository
@EnableJpaRepositories
public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
	List<Attendance> findByEmployeeEmployeeId(int employeeId);

}
