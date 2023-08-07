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
        if (!attendance.isPresent()) {
            attendance.setAttendanceDate(null); 
            if (attendance.getAbsenceReason() == null || attendance.getAbsenceReason().isEmpty()) {
                attendance.setAbsenceReason("Reason not provided");
            }
        } else {
            attendance.setAttendanceDate(LocalDate.now());
            attendance.setAbsenceReason("NA"); 
        }
        attendance.setAttendanceDate(LocalDate.now());
        return attendancerepo.save(attendance);
    }

    @Override
    public Attendance updateAttendance(int attendanceId, Attendance updatedAttendance) {
        Attendance attendance = attendancerepo.findById(attendanceId).orElse(null);
        if (attendance == null) {
            return null;
        }

        if (attendance.isPresent() != updatedAttendance.isPresent()) {
            attendance.setPresent(updatedAttendance.isPresent());
            
            if (!updatedAttendance.isPresent()) {
                if (updatedAttendance.getAbsenceReason() == null || updatedAttendance.getAbsenceReason().isEmpty()) {
                    attendance.setAbsenceReason("Reason not provided");
                } else {
                    attendance.setAbsenceReason(updatedAttendance.getAbsenceReason());
                }
            } else {
                attendance.setAbsenceReason(null);
            }
        }
       
        return attendancerepo.save(attendance);
    }

    @Override
    public Employee getEmployeeById(int employeeId) {
        return empRepo.findById(employeeId).orElse(null);
    }

    @Override
    public List<Attendance> getAttendanceByEmployeeId(int employeeId) {
        return attendancerepo.findByEmployeeEmployeeId(employeeId);
    }



}
