package com.example.trial.controllers;
import com.example.trial.models.User;
import com.example.trial.repository.UserRepository;
import com.example.trial.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 4800)
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

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    @PutMapping("/{userId}")
    public MessageResponse updateUserById(@PathVariable Long userId, @RequestBody User updatedUser) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());
            user.setPassword(updatedUser.getPassword());

            userRepository.save(user);

            return new MessageResponse("User updated successfully.");
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

}
