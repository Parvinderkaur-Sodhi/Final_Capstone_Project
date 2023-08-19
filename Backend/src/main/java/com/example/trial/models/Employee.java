package com.example.trial.models;

import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeId;

    private String fname;
    private String lname;
    private String gender;

    @Temporal(TemporalType.DATE)
    private Date dob;
    private String phoneNumber;
    private String department;
    private String jobTitle;
    private String email;
    private String username;

    @Temporal(TemporalType.DATE)
    private Date doJoining;

    @Temporal(TemporalType.DATE)
    private Date doLeaving;

    private String employeeStatus;
    private String address;
    private String pAddress;
    private String empRole;
    private Long idNo;

    private String other;

    @Lob
    private byte[] employeePic;

    @Lob
    private byte[] resume;

    private long userId;

//	public LeaveBalance getLeaveBalanceByType(LeaveType leaveTypeName) {
//        return null;
//    }

}
