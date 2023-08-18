package com.example.trial.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.trial.models.Attendance;
import com.example.trial.models.Employee;
import com.example.trial.repository.AttendanceRepository;
import com.example.trial.repository.EmployeeRepository;
import com.example.trial.service.AttendanceService;

@Service
public class AttendanceServiceImpl implements AttendanceService {
	
	AttendanceRepository attendancerepo;
	EmployeeRepository empRepo;
	
    @Autowired
    public AttendanceServiceImpl(AttendanceRepository attendancerepo, EmployeeRepository empRepo) {
		super();
		this.attendancerepo = attendancerepo;
		this.empRepo = empRepo;
	}
	
    @Override
    public Attendance markAttendance(Attendance attendance) {
    	attendance.setAttendanceDate(LocalDate.now());
    	return attendancerepo.save(attendance);
    }

    @Override
    public Attendance updateAttendance(int attendanceId, Attendance attendance) {
            	
    	Attendance existingAttendance=attendancerepo.findById(attendanceId).orElse(null);
    	if(existingAttendance !=null) {
    		existingAttendance.setPresent(attendance.getPresent());
    		existingAttendance .setAbsenceReason(attendance.getAbsenceReason());
    		
    		return attendancerepo.save(existingAttendance);
    		
    	}
    	return null;
   
    }

   

    @Override
    public List<Attendance> getAttendanceByEmployeeId(int employeeId) {
        return attendancerepo.findByEmployeeEmployeeId(employeeId);
    }

	

    @Override
	public List<Attendance> getAllAttendances() {
		List<Attendance> at= attendancerepo.findAll();
		return at;
	}
    
    @Override
    public Employee getEmployeeById(int employeeId) {
        return empRepo.findById(employeeId).orElse(null);
    }

}
