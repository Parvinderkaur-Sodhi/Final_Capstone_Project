package com.example.trial.models;

import com.example.trial.controllers.LeaveBalanceController;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@JsonDeserialize
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@Table(name = "leave_request")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id")
    private Employee employeeId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    private LeaveType leaveTypeName;

    private String status = "Pending";

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    private String reason;

    public void updateStatus(String newStatus, LeaveBalanceController leaveBalanceController) {
        if ("Rejected".equals(newStatus) || "Accepted".equals(newStatus)) {
            this.status = newStatus;

            // Calculate the number of days only if the status is "Accepted"
            if ("Accepted".equals(newStatus)) {
                // Calculate the number of days between start date and end date
                long millisecondsPerDay = 24 * 60 * 60 * 1000;
                int leaveDays = (int) ((endDate.getTime() - startDate.getTime()) / millisecondsPerDay) + 1;

                // Retrieve the allowed count for the leave type
                int allowedCount = leaveTypeName.getCountAllowed();

                // Calculate the balance by subtracting the leave days from the allowed count
                int balance = allowedCount - leaveDays;

                if (employeeId != null && leaveTypeName != null) {
                    // Get the existing leave balance by employeeId and leaveTypeName
                    List<LeaveBalance> leaveBalances = leaveBalanceController.getLeaveBalancesByEmployeeId(employeeId.getEmployeeId());
                    LeaveBalance leaveBalance = leaveBalances.stream()
                            .filter(lb -> lb.getLeaveType().equals(leaveTypeName))
                            .findFirst()
                            .orElse(null);

                    if (leaveBalance != null) {
                        // Check if the balance will go into negative
                        if (balance < 0) {
                            throw new IllegalArgumentException("Leave balance will go into negative");
                        }

                        // Leave balance entry already exists, update the balance
                        leaveBalance.setBalance(balance);
                        // Update the leave balance through the existing endpoint
                        leaveBalanceController.updateLeaveBalance(leaveBalance.getBalanceId(), leaveBalance);
                    } else {
                        // Leave balance entry doesn't exist, create a new entry
                        LeaveBalance newLeaveBalance = new LeaveBalance();
                        newLeaveBalance.setEmployee(employeeId);
                        newLeaveBalance.setLeaveType(leaveTypeName);

                        // Check if the balance will go into negative
                        if (balance < 0) {
                            throw new IllegalArgumentException("Leave balance will go into negative");
                        }

                        newLeaveBalance.setBalance(balance);
                        // Save the new leave balance through the save endpoint
                        leaveBalanceController.saveLeaveBalance(newLeaveBalance);
                    }
                }
            }
        } else {
            throw new IllegalArgumentException("Invalid status: " + newStatus);
        }
    }

}
