package com.example.trial.service;


import com.example.trial.models.LeaveRequest;

import java.util.List;

public interface LeaveRequestService {
    List<LeaveRequest> getAllLeaveRequests();

    LeaveRequest getLeaveRequestById(int leaveRequestId);

    LeaveRequest saveLeaveRequest(LeaveRequest leaveRequest);

    LeaveRequest updateLeaveRequest(int requestId, LeaveRequest leaveRequest);

    void deleteLeaveRequest(int leaveRequestId);

    List<LeaveRequest> getLeaveRequestsByEmployeeId(int employeeId);
    LeaveRequest updateLeaveRequestStatus(int requestId, String newStatus);

}
