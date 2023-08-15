package com.example.trial.controllers;
import com.example.trial.models.User;
import com.example.trial.repository.UserRepository;
import com.example.trial.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 4800)
@RestController
@RequestMapping("/api/test")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        // Fetch all users from the UserRepository
        List<User> users = userRepository.findAll();
        return users;
    }

    @GetMapping("/all")
    public MessageResponse allAccess() {
        return new MessageResponse("Server is up.....");
    }

    @GetMapping("/greeting")
    @PreAuthorize("isAuthenticated()")
    public MessageResponse userAccess() {

        return new MessageResponse("Congratulations! You are an authenticated user.");
    }

}
