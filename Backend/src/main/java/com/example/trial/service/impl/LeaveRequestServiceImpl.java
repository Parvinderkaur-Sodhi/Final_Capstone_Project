package com.example.trial.service.impl;

import com.example.trial.repository.LeaveRequestRepository;
import com.example.trial.controllers.LeaveBalanceController;
import com.example.trial.models.LeaveRequest;
import com.example.trial.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceController leaveBalanceController;

    @Autowired
    public LeaveRequestServiceImpl(LeaveRequestRepository leaveRequestRepository, LeaveBalanceController leaveBalanceController) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveBalanceController = leaveBalanceController;
    }

    @Override
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    @Override
    public LeaveRequest getLeaveRequestById(int leaveRequestId) {
        return leaveRequestRepository.findById(leaveRequestId).orElse(null);
    }

    @Override
    public LeaveRequest saveLeaveRequest(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    @Override
    public LeaveRequest updateLeaveRequest(int requestId, LeaveRequest leaveRequest) {
        LeaveRequest existingLeaveRequest = leaveRequestRepository.findById(requestId).orElse(null);
        if (existingLeaveRequest != null) {
            // Update properties of existingLeaveRequest using leaveRequest object
            existingLeaveRequest.setLeaveTypeName(leaveRequest.getLeaveTypeName());
            existingLeaveRequest.setStartDate(leaveRequest.getStartDate());
            existingLeaveRequest.setEndDate(leaveRequest.getEndDate());
            existingLeaveRequest.setReason(leaveRequest.getReason());
            existingLeaveRequest.setStatus(leaveRequest.getStatus());

            return leaveRequestRepository.save(existingLeaveRequest);
        }
        return null;
    }

    @Override
    public void deleteLeaveRequest(int leaveRequestId) {
        leaveRequestRepository.deleteById(leaveRequestId);
    }

    @Override
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(int employeeId) {
        return leaveRequestRepository.findByEmployeeIdEmployeeId(employeeId);
    }
//    @Override
//    public LeaveRequest updateLeaveRequestStatus(int requestId, String newStatus) {
//        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId).orElse(null);
//        if (leaveRequest != null) {
//            leaveRequest.updateStatus(newStatus);
//            return leaveRequestRepository.save(leaveRequest);
//        }
//        return null;
//    }

    @Override
    public LeaveRequest updateLeaveRequestStatus(int requestId, String newStatus) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId).orElse(null);
        if (leaveRequest != null) {
            leaveRequest.updateStatus(newStatus, leaveBalanceController);
            return leaveRequestRepository.save(leaveRequest);
        }
        return null;
    }


}
