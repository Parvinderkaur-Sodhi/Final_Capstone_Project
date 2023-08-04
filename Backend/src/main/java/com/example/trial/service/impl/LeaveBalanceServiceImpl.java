package com.example.trial.service.impl;


import com.example.trial.models.LeaveBalance;
import com.example.trial.repository.LeaveBalanceRepository;
import com.example.trial.service.LeaveBalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveBalanceServiceImpl implements LeaveBalanceService {

    private final LeaveBalanceRepository leaveBalanceRepository;

    @Autowired
    public LeaveBalanceServiceImpl(LeaveBalanceRepository leaveBalanceRepository) {
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    @Override
    public List<LeaveBalance> getAllLeaveBalances() {
        return leaveBalanceRepository.findAll();
    }

    @Override
    public LeaveBalance getLeaveBalanceById(int leaveBalanceId) {
        return leaveBalanceRepository.findById(leaveBalanceId).orElse(null);
    }

    @Override
    public LeaveBalance saveLeaveBalance(LeaveBalance leaveBalance) {
        return leaveBalanceRepository.save(leaveBalance);
    }

    @Override
    public LeaveBalance updateLeaveBalance(int balanceId, LeaveBalance leaveBalance) {
        LeaveBalance existingLeaveBalance = leaveBalanceRepository.findById(balanceId).orElse(null);
        if (existingLeaveBalance != null) {
            // Update properties of existingLeaveBalance using leaveBalance object
            existingLeaveBalance.setEmployee(leaveBalance.getEmployee());
            existingLeaveBalance.setLeaveType(leaveBalance.getLeaveType());
            existingLeaveBalance.setBalance(leaveBalance.getBalance());

            return leaveBalanceRepository.save(existingLeaveBalance);
        }
        return null;
    }

    @Override
    public void deleteLeaveBalance(int leaveBalanceId) {
        leaveBalanceRepository.deleteById(leaveBalanceId);
    }

    @Override
    public List<LeaveBalance> getLeaveBalancesByEmployeeId(int employeeId) {
        return leaveBalanceRepository.findByEmployeeEmployeeId(employeeId);
    }
}
