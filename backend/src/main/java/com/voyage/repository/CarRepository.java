package com.voyage.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.voyage.model.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
	List<Car> findByOwnerId(Long ownerId);
}