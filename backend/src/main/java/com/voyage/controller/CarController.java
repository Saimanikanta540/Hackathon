package com.voyage.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.voyage.model.Car;
import com.voyage.service.CarService;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping
    public ResponseEntity<String> addCar(@RequestBody Car car) {
        String result = carService.addCar(car);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.viewAllCars();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Car car = carService.viewCarById(id);
        if (car != null) {
            return ResponseEntity.ok(car);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Car>> getCarsByOwnerId(@PathVariable Long ownerId) {
        List<Car> cars = carService.findByOwnerId(ownerId);
        return ResponseEntity.ok(cars);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCar(@PathVariable Long id, @RequestBody Car car) {
        String result = carService.updateCar(id, car);
        if (result.contains("Not Found")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long id) {
        String result = carService.deleteCar(id);
        if (result.contains("Not Found")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }
} 