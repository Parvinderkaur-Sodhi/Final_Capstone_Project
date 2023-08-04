package com.example.trial.service.impl;

import com.example.trial.models.LeaveType;
import com.example.trial.repository.LeaveTypeRepository;
import com.example.trial.service.LeaveTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveTypeServiceImpl implements LeaveTypeService {

    private final LeaveTypeRepository leaveTypeRepository;

    @Autowired
    public LeaveTypeServiceImpl(LeaveTypeRepository leaveTypeRepository) {
        this.leaveTypeRepository = leaveTypeRepository;
    }

    @Override
    public List<LeaveType> getAllLeaveTypes() {
        return leaveTypeRepository.findAll();
    }

    @Override
    public Optional<LeaveType> getLeaveTypeById(int typeId) {
        return leaveTypeRepository.findById(typeId);
    }

    @Override
    public LeaveType saveLeaveType(LeaveType leaveType) {
        return leaveTypeRepository.save(leaveType);
    }

    @Override
    public void deleteLeaveType(int typeId) {
        leaveTypeRepository.deleteById(typeId);
    }

    @Override
    public LeaveType updateLeaveType(int typeId, LeaveType leaveType) {
        LeaveType existingLeaveType = leaveTypeRepository.findById(typeId).orElse(null);
        if (existingLeaveType != null) {
            // Update properties of existingLeaveType using leaveType object
            existingLeaveType.setTypeName(leaveType.getTypeName());
            existingLeaveType.setCountAllowed(leaveType.getCountAllowed());

            return leaveTypeRepository.save(existingLeaveType);
        }
        return null;
    }
}
