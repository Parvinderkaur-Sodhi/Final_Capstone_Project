package com.example.trial.models;

import java.time.LocalDate;


import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="attendance")
public class Attendance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int attendanceId;
	 
	private String present;
    private LocalDate attendanceDate;
    
    private String absenceReason; 

    
    @ManyToOne
    @JoinColumn
    private Employee employee;
    
  
    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED
    }
    
    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;
    
    
   
    public Attendance(Employee employee) {
		super();
		this.employee = employee;
	}
    
	  
}
