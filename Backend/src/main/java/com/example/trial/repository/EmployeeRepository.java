package com.example.trial.repository;

import com.example.trial.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    @Query("SELECT e.employeeId FROM Employee e WHERE e.userId = :userId")
    Integer getEmployeeIdByUserId(@Param("userId") Long userId);
}
