package com.voyage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voyage.model.Booking;
import com.voyage.model.Car;
import com.voyage.repository.BookingRepository;
import com.voyage.repository.CarRepository;

@Service
public class BookingService {

	  @Autowired
	  private BookingRepository bookingRepo;
	  
	  @Autowired
	  private CarRepository carRepo;
	  
	  public String addBooking(Booking b) {
		  bookingRepo.save(b);
		  // Decrement availableCount for the car
		  Car car = carRepo.findById(b.getCar().getId()).orElse(null);
		  if (car != null && car.getAvailableCount() > 0) {
			  car.setAvailableCount(car.getAvailableCount() - 1);
			  if (car.getAvailableCount() == 0) {
				  car.setStatus("Unavailable");
			  }
			  carRepo.save(car);
		  }
	    return "Booking Data Inserted Successfully...!!!";
	  }

	  public List<Booking> viewAllBookings() {
	    return bookingRepo.findAll();
	  }

	  public Booking viewBookingById(Long id) {
	    Optional<Booking> booking = bookingRepo.findById(id);
	    return booking.orElse(null);
	  }
	  
	  public List<Booking> findByCustomerId(Long id){
		  List<Booking> bookings = bookingRepo.findByCustomerId(id);
		  return bookings;
	  }

	  public String updateBooking(Long id, Booking booking) {
	    Optional<Booking> existingBooking = bookingRepo.findById(id);
	    
	    if(existingBooking.isPresent()) {
	      Booking existing = existingBooking.get();
	      existing.setCar(booking.getCar());
	      existing.setCustomer(booking.getCustomer());
	      existing.setEndDate(booking.getEndDate());
	      existing.setStartDate(booking.getStartDate());
	      existing.setStatus(booking.getStatus());
	      existing.setTotalPrice(booking.getTotalPrice());
	      
	      bookingRepo.save(existing);
	      return "Booking Updated Successfully";
	    }
	    else
	      return "Booking ID Not Found";
	  }

	  public String deleteBooking(Long id) {
	    Optional<Booking> booking = bookingRepo.findById(id);
	    if(booking.isPresent()) {
	      bookingRepo.deleteById(id);
	      return "Booking With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "Booking ID Not Found";
	  }
}
