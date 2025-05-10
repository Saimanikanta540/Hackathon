package com.voyage.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voyage.model.Customer;
import com.voyage.repository.CustomerRepository;

@Service
public class CustomerService {

	  @Autowired
	  private CustomerRepository customerRepo;
	  
	  public String addCustomer(Customer c) {
	    customerRepo.save(c);
	    return "Customer Data Inserted Successfully...!!!";
	  }

	  public List<Customer> viewAllCustomers() {
	    return customerRepo.findAll();
	  }

	  public Customer viewCustomerById(Long id) {
	    Optional<Customer> customer = customerRepo.findById(id);
	    return customer.orElse(null);
	  }

	  public String updateCustomer(Long id, Customer customer) {
	    Optional<Customer> existingCustomer = customerRepo.findById(id);
	    
	    if(existingCustomer.isPresent()) {
	      Customer existing = existingCustomer.get();
	      existing.setName(customer.getName());
	      existing.setEmail(customer.getEmail());
	      existing.setGender(customer.getGender());
	      existing.setAge(customer.getAge());
	      
	      customerRepo.save(existing);
	      return "Customer Updated Successfully";
	    }
	    else
	      return "Customer ID Not Found";
	  }

	  public String deleteCustomer(Long id) {
	    Optional<Customer> customer = customerRepo.findById(id);
	    if(customer.isPresent()) {
	      customerRepo.deleteById(id);
	      return "Customer With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "Customer ID Not Found";
	  }
}
