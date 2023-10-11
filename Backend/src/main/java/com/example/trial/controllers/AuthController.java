package com.example.trial.controllers;

import com.example.trial.models.Employee;
import com.example.trial.models.User;
import com.example.trial.repository.UserRepository;
import com.example.trial.request.LoginRequest;
import com.example.trial.request.SignupRequest;
import com.example.trial.response.JwtResponse;
import com.example.trial.response.MessageResponse;
import com.example.trial.security.jwt.JwtUtils;
import com.example.trial.security.services.UserDetailsImpl;
import com.example.trial.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private final EmployeeService employeeService;

    @Autowired
    public AuthController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/getEmployeeId")
    public ResponseEntity<Integer> getEmployeeIdByUserId(@RequestParam Long userId) {
        Integer employeeId = employeeService.getEmployeeIdByUserId(userId);
        return ResponseEntity.ok(employeeId);
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateuser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        String selectedRole = loginRequest.getRole();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Perform role validation
        if (selectedRole.equals(userDetails.getRole())) {
            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getRole(), userDetails.getUsername(), userDetails.getEmail()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("Error! Unauthorized Access"));
        }

}

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error! Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error! Email is already in use!"));
        }

        // Create new user account
        User user = new User(signUpRequest.getRole(), signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        // Create corresponding employee record
        Employee employee = new Employee();
        employee.setUserId(user.getId());
        employee.setEmail(signUpRequest.getEmail());
        employee.setUsername(signUpRequest.getUsername());
        employee.setFname(signUpRequest.getUsername());
        employee.setEmpRole(signUpRequest.getRole());
        employeeService.saveEmployee(employee);

        return ResponseEntity.ok(new MessageResponse("user registered successfully!"));
    }
}