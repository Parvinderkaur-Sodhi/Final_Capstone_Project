package com.example.trial.service.impl;

import java.time.LocalDate;

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
		// TODO Auto-generated method stub
		attendance.setAttendanceDate(LocalDate.now());
		return attendancerepo.save(attendance);
	
	}

	@Override
	public Attendance updateAttendance(int attendanceId, Attendance updatedAttendance) {
		// TODO Auto-generated method stub
		Attendance attendance= attendancerepo.findById(attendanceId).orElse(null);
		if(attendance==null) {
			return null;
		}
		attendance.setPresent(updatedAttendance.isPresent());
		return attendancerepo.save(attendance);
	}

	@Override
	public Employee getEmployeeById(int employeeId) {
		// TODO Auto-generated method stub
		return empRepo.findById(employeeId).orElse(null);
	}

	

}
