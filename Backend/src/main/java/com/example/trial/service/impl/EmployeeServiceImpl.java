package com.example.trial.service.impl;

import com.example.trial.models.Employee;
import com.example.trial.repository.EmployeeRepository;
import com.example.trial.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(int employeeId) {
        return employeeRepository.findById(employeeId).orElse(null);
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(int employeeId, Employee employee) {
        Employee existingEmployee = employeeRepository.findById(employeeId).orElse(null);
        if (existingEmployee != null) {
            // Update properties of existingEmployee using employee object
            existingEmployee.setFname(employee.getFname());
            existingEmployee.setLname(employee.getLname());
            existingEmployee.setPhoneNumber(employee.getPhoneNumber());
            existingEmployee.setDepartment(employee.getDepartment());
            existingEmployee.setGender(employee.getGender());
            existingEmployee.setDob(employee.getDob());
            existingEmployee.setJobTitle(employee.getJobTitle());
            existingEmployee.setDoJoining(employee.getDoJoining());
            existingEmployee.setEmployeePic(employee.getEmployeePic());
            existingEmployee.setResume(employee.getResume());

            return employeeRepository.save(existingEmployee);
        }
        return null;
    }

    @Override
    public void deleteEmployee(int employeeId) {
        employeeRepository.deleteById(employeeId);
    }
}
