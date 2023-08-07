package com.example.trial.service;

import com.example.trial.models.Attendance;
import com.example.trial.models.Employee;


public interface AttendanceService {
	
	Attendance markAttendance(Attendance attendance);
    Attendance updateAttendance(int attendanceId, Attendance updatedAttendance);
    
    Employee getEmployeeById(int employeeId);

}
