package com.voyage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.voyage.service.EmailService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendContactMessage(@RequestBody ContactFormRequest request) {
        try {
            emailService.sendContactEmail(request.getName(), request.getEmail(), request.getMessage());
            return ResponseEntity.ok().body(new MessageResponse("Message sent successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to send message. Please try again."));
        }
    }
}

class ContactFormRequest {
    private String name;
    private String email;
    private String message;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}

class MessageResponse {
    private String message;
    
    public MessageResponse(String message) {
        this.message = message;
    }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
} 