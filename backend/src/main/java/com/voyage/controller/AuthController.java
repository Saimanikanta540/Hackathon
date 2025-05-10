package com.voyage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.voyage.model.User;
import com.voyage.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        System.out.println("Login request received: " + loginRequest.getEmail() + " " + loginRequest.getPassword());
        User user = userService.findByEmail(loginRequest.getEmail());
        
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // Remove password from response
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        
        return ResponseEntity.badRequest().body("Invalid email or password");
    }
} 