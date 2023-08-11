package com.example.trial.controllers;

import com.example.trial.custom.ResourceNotFoundException;
import com.example.trial.models.Employee;
import com.example.trial.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600000)
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{employeeId}")
    @ResponseStatus(HttpStatus.OK)
    public Employee getEmployeeById(@PathVariable int employeeId) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        if (employee == null) {
            throw new ResourceNotFoundException("Employee not found with ID: " + employeeId);
        }
        return employee;
    }

    @PostMapping
    public Employee saveEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    @PutMapping("/{employeeId}")
    public Employee updateEmployee(@PathVariable int employeeId, @RequestBody Employee employee) {
        return employeeService.updateEmployee(employeeId, employee);
    }

    @DeleteMapping("/{employeeId}")
    public void deleteEmployee(@PathVariable int employeeId) {
        employeeService.deleteEmployee(employeeId);
    }
    
    
}
