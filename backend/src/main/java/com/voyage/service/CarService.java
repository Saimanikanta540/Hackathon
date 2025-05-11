package com.voyage.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voyage.model.Car;
import com.voyage.model.User;
import com.voyage.repository.CarRepository;
import com.voyage.repository.UserRepository;

@Service
public class CarService {

	  @Autowired
	  private CarRepository carRepo;
	  
	  @Autowired
	  private UserRepository userRepo;
	  
	  public String addCar(Car c) {
	    // Check if car with this ID already exists
	    if (c.getId() != null) {
	      Optional<Car> existingCar = carRepo.findById(c.getId());
	      if (existingCar.isPresent()) {
	        // Update existing car
	        Car existing = existingCar.get();
	        existing.setName(c.getName());
	        existing.setBrand(c.getBrand());
	        existing.setType(c.getType());
	        existing.setColor(c.getColor());
	        existing.setFuelType(c.getFuelType());
	        existing.setImage(c.getImage());
	        existing.setPrice(c.getPrice());
	        existing.setStatus(c.getStatus());
	        existing.setAvailableCount(c.getAvailableCount());
	        carRepo.save(existing);
	        return "Car Data Updated Successfully...!!!";
	      }
	    }
	    // For new cars, don't set the ID
	    c.setId(null);
	    carRepo.save(c);
	    return "Car Data Inserted Successfully...!!!";
	  }

	  public List<Car> viewAllCars() {
	    return carRepo.findAll();
	  }

	  public Car viewCarById(Long id) {
	    Optional<Car> car = carRepo.findById(id);
	    return car.orElse(null);
	  }

	  public String updateCar(Long id, Car car) {
	    Optional<Car> existingCar = carRepo.findById(id);
	    
	    if(existingCar.isPresent()) {
	      Car existing = existingCar.get();
	      existing.setName(car.getName());
	      existing.setBrand(car.getBrand());
	      existing.setType(car.getType());
	      existing.setColor(car.getColor());
	      existing.setFuelType(car.getFuelType());
	      existing.setImage(car.getImage());
	      existing.setPrice(car.getPrice());
	      existing.setStatus(car.getStatus());
	      carRepo.save(existing);
	      return "Car details Updated Successfully";
	    }
	    else
	      return "Car ID Not Found";
	  }

	  public String deleteCar(Long id) {
	    Optional<Car> car = carRepo.findById(id);
	    if(car.isPresent()) {
	      carRepo.deleteById(id);
	      return "Car With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "Car ID Not Found";
	  }
}