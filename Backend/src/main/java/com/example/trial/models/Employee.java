package com.example.trial.models;

import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


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

    @Temporal(TemporalType.DATE)
    private Date doJoining;

    private String employeeStatus;

    @Lob
    private byte[] employeePic;

    @Lob
    private byte[] resume;

	public LeaveBalance getLeaveBalanceByType(LeaveType leaveTypeName) {
        return null;
    }

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email", unique = true)
    private User user;

    // Getter and Setter for the User association
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
