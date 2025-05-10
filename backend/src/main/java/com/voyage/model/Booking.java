package com.voyage.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "bookings")
public class Booking {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "customerId", nullable = false)
	private User customer;

	@ManyToOne
	@JoinColumn(name = "carId", nullable = false)
	private Car car;

	@NotNull(message = "Start date is required")
	@Future(message = "Start date must be in the future")
	private LocalDate startDate;

	@NotNull(message = "End date is required")
	@Future(message = "End date must be in the future")
	private LocalDate endDate;

	@Min(value = 0, message = "Total price cannot be negative")
	private double totalPrice;

	@NotBlank(message = "Status is required")
	@Pattern(regexp = "^(Pending|Confirmed|Cancelled|Completed)$", message = "Invalid status")
	private String status;

	public Long getId() { return id;}
	public void setId(Long id) { this.id = id;}
	
	public User getCustomer() { return customer; }
	public void setCustomer(User customer) { this.customer = customer; }
	
	public Car getCar() { return car; }	
	public void setCar(Car car) { this.car = car; }
	
	public LocalDate getStartDate() { return startDate; }
	public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
	
	public LocalDate getEndDate() { return endDate; }
	public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
	
	public double getTotalPrice() { return totalPrice; }
	public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
	
	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }
	
	@Override
	public String toString() {
		return "Booking [id=" + id + ", customer=" + customer + ", car=" + car + ", startDate=" + startDate + ", endDate="
				+ endDate + ", totalPrice=" + totalPrice + ", status=" + status + "]";
	}
}

