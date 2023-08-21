package com.example.trial.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
@CrossOrigin(origins = "http://localhost:3000")  
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
		
		
		Employee employee = attendanceService.getEmployeeById(employeeId);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        attendance.setEmployee(employee);
        
        Attendance markedAttendance = attendanceService.markAttendance(attendance);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(markedAttendance);
		
	}
	
	@GetMapping
	public ResponseEntity<List<Attendance>> getAllAttendances(){
		List<Attendance> allD=attendanceService.getAllAttendances();
		return new ResponseEntity<>(allD, HttpStatus.OK);
	}
	
	
	@PutMapping("/{attendanceId}")
	public Attendance updateAttendance(@PathVariable int attendanceId, @RequestBody Attendance attendance) {
		return attendanceService.updateAttendance(attendanceId, attendance);
	}
	
	@GetMapping("/{employeeId}")
	public ResponseEntity<List<Attendance>> getAttendanceByEmployeeId(@PathVariable int employeeId) {
		List<Attendance> attendanceList = attendanceService.getAttendanceByEmployeeId(employeeId);
		if (attendanceList.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(attendanceList);
	}
	
	
	
	 @PutMapping("/approve/{attendanceId}")
	    public ResponseEntity<Attendance> approveAttendance(@PathVariable int attendanceId) {
	        Attendance approvedAttendance = attendanceService.approveAttendance(attendanceId);
	        if (approvedAttendance != null) {
	            return ResponseEntity.ok(approvedAttendance);
	        }
	        return ResponseEntity.notFound().build();
	    }

	    @PutMapping("/reject/{attendanceId}")
	    public ResponseEntity<Attendance> rejectAttendance(@PathVariable int attendanceId) {
	        Attendance rejectedAttendance = attendanceService.rejectAttendance(attendanceId);
	        if (rejectedAttendance != null) {
	            return ResponseEntity.ok(rejectedAttendance);
	        }
	        return ResponseEntity.notFound().build();
	    }

	    @GetMapping("/pending")
	    public ResponseEntity<List<Attendance>> getPendingAttendances() {
	        List<Attendance> pendingAttendances = attendanceService.getPendingAttendances();
	        return ResponseEntity.ok(pendingAttendances);
	    }
	    
	    
	    @PutMapping("/{attendanceId}/update-absence-reason")
	    public ResponseEntity<Attendance> updateAbsenceReason(@PathVariable int attendanceId, @RequestBody Attendance updatedAttendance) {
	        Attendance existingAttendance = attendanceService.getAttendanceById(attendanceId);
	        if (existingAttendance == null) {
	            return ResponseEntity.notFound().build();
	        }
	        
	        existingAttendance.setAbsenceReason(updatedAttendance.getAbsenceReason());
	        Attendance updatedAttendanceRecord = attendanceService.updateAbsenceReason(existingAttendance);
	        
	        return ResponseEntity.ok(updatedAttendanceRecord);
	    }

	


}
