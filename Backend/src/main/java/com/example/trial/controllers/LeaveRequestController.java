package com.example.trial.controllers;

import com.example.trial.custom.ResourceNotFoundException;
import com.example.trial.models.LeaveRequest;
import com.example.trial.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;
    private final LeaveBalanceController leaveBalanceController;

    @Autowired
    public LeaveRequestController(LeaveRequestService leaveRequestService, LeaveBalanceController leaveBalanceController) {
        this.leaveRequestService = leaveRequestService;
        this.leaveBalanceController = leaveBalanceController;
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestService.getAllLeaveRequests();
    }

    @GetMapping("/{leaveRequestId}")
    public LeaveRequest getLeaveRequestById(@PathVariable int leaveRequestId) {
        LeaveRequest leaveRequest = leaveRequestService.getLeaveRequestById(leaveRequestId);
        if (leaveRequest == null) {
            throw new ResourceNotFoundException("Leave request not found with ID: " + leaveRequestId);
        }
        return leaveRequest;
    }

    @PostMapping
    public LeaveRequest saveLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.saveLeaveRequest(leaveRequest);
    }

    @PutMapping("/{leaveRequestId}")
    public LeaveRequest updateLeaveRequest(@PathVariable int leaveRequestId, @RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.updateLeaveRequest(leaveRequestId, leaveRequest);
    }

    @DeleteMapping("/{leaveRequestId}")
    public void deleteLeaveRequest(@PathVariable int leaveRequestId) {
        leaveRequestService.deleteLeaveRequest(leaveRequestId);
    }

    @GetMapping("/{employeeId}")
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(@PathVariable int employeeId) {
        return leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);
    }

//    @PutMapping("/{requestId}/status")
//    public ResponseEntity<String> updateLeaveRequestStatus(@PathVariable int requestId, @RequestBody Map<String, String> statusMap) {
//        String newStatus = statusMap.get("status");
//        LeaveRequest updatedLeaveRequest = leaveRequestService.updateLeaveRequestStatus(requestId, newStatus);
//        if (updatedLeaveRequest != null) {
//            return ResponseEntity.ok("Leave request status updated successfully.");
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<String> updateLeaveRequestStatus(@PathVariable int requestId, @RequestBody Map<String, String> statusMap) {
        String newStatus = statusMap.get("status");
        LeaveRequest leaveRequest = leaveRequestService.getLeaveRequestById(requestId);

        if (leaveRequest != null) {
            leaveRequest.updateStatus(newStatus, leaveBalanceController);
            leaveRequestService.saveLeaveRequest(leaveRequest);

            return ResponseEntity.ok("Leave request status updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
