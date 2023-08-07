package com.example.trial.service;

import java.time.LocalDate;
import java.util.List;

import com.example.trial.models.Attendance;
import com.example.trial.models.Employee;


public interface AttendanceService {
	
	Attendance markAttendance(Attendance attendance);
    Attendance updateAttendance(int attendanceId, Attendance updatedAttendance);
    
    Employee getEmployeeById(int employeeId);
    
    List<Attendance> getAttendanceByEmployeeId(int employeeId);
    

}
