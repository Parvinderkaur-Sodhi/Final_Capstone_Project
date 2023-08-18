package com.example.trial.service;

import java.time.LocalDate;
import java.util.List;

import com.example.trial.models.Attendance;
import com.example.trial.models.Employee;


public interface AttendanceService {
	
	Attendance markAttendance(Attendance attendance);
	Employee getEmployeeById(int employeeId);
	List<Attendance> getAllAttendances();
    Attendance updateAttendance(int attendanceId, Attendance attendance);
    List<Attendance> getAttendanceByEmployeeId(int employeeId);

}
