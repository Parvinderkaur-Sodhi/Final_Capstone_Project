package com.example.trial.controllers;


import com.example.trial.custom.ResourceNotFoundException;
import com.example.trial.models.LeaveBalance;
import com.example.trial.service.LeaveBalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000, maxAge = 3600")
@RequestMapping("/api/leave-balances")
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;

    @Autowired
    public LeaveBalanceController(LeaveBalanceService leaveBalanceService) {
        this.leaveBalanceService = leaveBalanceService;
    }

    @GetMapping
    public List<LeaveBalance> getAllLeaveBalances() {
        return leaveBalanceService.getAllLeaveBalances();
    }

    @GetMapping("/{leaveBalanceId}")
    @ResponseStatus(HttpStatus.OK)
    public LeaveBalance getLeaveBalanceById(@PathVariable int leaveBalanceId) {
        LeaveBalance leaveBalance = leaveBalanceService.getLeaveBalanceById(leaveBalanceId);
        if (leaveBalance == null) {
            throw new ResourceNotFoundException("Leave balance not found with ID: " + leaveBalanceId);
        }
        return leaveBalance;
    }

    @PostMapping
    public LeaveBalance saveLeaveBalance(@RequestBody LeaveBalance leaveBalance) {
        return leaveBalanceService.saveLeaveBalance(leaveBalance);
    }

    @PutMapping("/{leaveBalanceId}")
    public LeaveBalance updateLeaveBalance(@PathVariable int leaveBalanceId, @RequestBody LeaveBalance leaveBalance) {
        return leaveBalanceService.updateLeaveBalance(leaveBalanceId, leaveBalance);
    }

    @DeleteMapping("/{leaveBalanceId}")
    public void deleteLeaveBalance(@PathVariable int leaveBalanceId) {
        leaveBalanceService.deleteLeaveBalance(leaveBalanceId);
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveBalance> getLeaveBalancesByEmployeeId(@PathVariable int employeeId) {
        return leaveBalanceService.getLeaveBalancesByEmployeeId(employeeId);
    }
}
