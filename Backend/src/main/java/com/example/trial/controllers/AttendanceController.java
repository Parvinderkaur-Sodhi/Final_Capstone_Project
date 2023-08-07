package com.example.trial.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trial.models.Attendance;
import com.example.trial.models.Employee;
import com.example.trial.service.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
	
	private final AttendanceService attendanceService;
    
	@Autowired
	public AttendanceController(AttendanceService attendanceService) {
		super();
		this.attendanceService = attendanceService;
	}
	
	@PostMapping("/addattendance/{employeeId}")
	public ResponseEntity<Attendance> markAttendance(@PathVariable int employeeId, @RequestBody Attendance attendance){
		//retrieve employee using employeeId
		Employee employee= attendanceService.getEmployeeById(employeeId);
		if(employee==null) {
			return ResponseEntity.notFound().build();
		}
		attendance.setEmployee(employee);
		
		
		Attendance savedAttendance=attendanceService.markAttendance(attendance);
		return ResponseEntity.ok(savedAttendance);
	}
	
	@PutMapping("/{attendanceId}")
	public ResponseEntity<Attendance> updateAttendance(@PathVariable int attendanceId, @RequestBody Attendance updatedAttendance){
		Attendance attendance=attendanceService.updateAttendance(attendanceId, updatedAttendance);
		if(attendance==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(attendance);
	}
	
	
	
	
	
	

}
