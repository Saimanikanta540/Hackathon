package com.voyage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendContactEmail(String name, String email, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("saimanikanta0540@gmail.com"); // Replace with your email
        mailMessage.setTo("saipasumarthi540@gmail.com"); // Your email where you want to receive messages
        mailMessage.setSubject("New Contact Form Message from " + name);
        mailMessage.setText("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);
        
        emailSender.send(mailMessage);
    }
} 