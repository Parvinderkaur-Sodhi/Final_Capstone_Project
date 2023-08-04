package com.example.trial.models;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
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
}
