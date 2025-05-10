package com.voyage.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "cars")
public class Car {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name is required")
	private String name;

	@NotBlank(message = "Brand is required")
	private String brand;

	@NotBlank(message = "Type is required")
	private String type;

	@NotBlank(message = "Color is required")
	private String color;

	@NotBlank(message = "Fuel type is required")
	@Pattern(regexp = "^(PETROL|DIESEL|ELECTRIC|HYBRID)$", message = "Invalid fuel type")
	private String fuelType;

	@NotBlank(message = "Image URL is required")
	private String image;

	@Min(value = 0, message = "Price cannot be negative")
	private double price;

	@NotBlank(message = "Status is required")
	@Pattern(regexp = "^(Available|Booked|Maintenance|Unavailable)$", message = "Invalid status")
	private String status;

	@ManyToOne
	@JoinColumn(name = "ownerId", nullable = false)
	private User owner; // Owner is a Customer (User with Customer role)

	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getBrand() { return brand; }
	public void setBrand(String brand) { this.brand = brand; }

	public String getType() { return type; }
	public void setType(String type) { this.type = type; }

	public String getColor() { return color; }
	public void setColor(String color) { this.color = color; }

	public String getFuelType() { return fuelType; }
	public void setFuelType(String fuelType) { this.fuelType = fuelType; }

	public String getImage() { return image; }
	public void setImage(String image) { this.image = image; }

	public double getPrice() { return price; }
	public void setPrice(double price) { this.price = price; }

	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	public User getOwner() { return owner; }
	public void setOwner(User owner) { this.owner = owner; }

	@Override
	public String toString() {
		return "Car [id=" + id + ", name=" + name + ", brand=" + brand + ", type=" + type 
			+ ", color=" + color + ", fuelType=" + fuelType + ", price=" + price 
			+ ", status=" + status + "]";
	}	
}