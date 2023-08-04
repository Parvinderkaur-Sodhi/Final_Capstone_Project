package com.example.trial.service;

import com.example.trial.models.LeaveType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface LeaveTypeService {
    List<LeaveType> getAllLeaveTypes();
    Optional<LeaveType> getLeaveTypeById(int typeId);
    LeaveType saveLeaveType(LeaveType leaveType);
    void deleteLeaveType(int typeId);
    LeaveType updateLeaveType(int leaveTypeId, LeaveType leaveType);
}
