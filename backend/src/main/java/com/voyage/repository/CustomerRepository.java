package com.voyage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voyage.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Basic CRUD operations are automatically provided by JpaRepository
    // Additional custom queries can be added here if needed
} 