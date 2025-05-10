-- 1. Insert Users
INSERT INTO users (id, name, email, password, role) VALUES
                                                        (1, 'Admin User', 'admin@carrental.com', 'admin123', 'Admin'),
                                                        (2, 'John Doe', 'john@example.com', 'customer123', 'Customer'),
                                                        (3, 'Jane Smith', 'jane@example.com', 'customer123', 'Customer'),
                                                        (4, 'Mike Johnson', 'mike@example.com', 'customer123', 'Customer');

-- 2. Insert Customers
INSERT INTO customers (id, age, email, gender, name, userId) VALUES
                                                                 (1, 30, 'john@example.com', 'Male', 'John Doe', 2),  -- userId = 2
                                                                 (2, 28, 'jane@example.com', 'Female', 'Jane Smith', 3),  -- userId = 3
                                                                 (3, 35, 'mike@example.com', 'Male', 'Mike Johnson', 4);  -- userId = 4

-- 3. Insert Cars
INSERT INTO cars (id, name, brand, type, color, fuelType, image, price, status, ownerId) VALUES
                                                                                             (1, 'Toyota Camry', 'Toyota', 'Sedan', 'Silver', 'PETROL', 'https://imgd.aeplcdn.com/370x208/n/cw/ec/131825/be-6e-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80', 50.00, 'Available', 2),
                                                                                             (2, 'Honda Civic', 'Honda', 'Sedan', 'Blue', 'PETROL', 'https://imgd.aeplcdn.com/370x208/n/cw/ec/106815/creta-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80', 45.00, 'Available', 2),
                                                                                             (3, 'Tesla Model 3', 'Tesla', 'Sedan', 'White', 'ELECTRIC', 'https://imgd.aeplcdn.com/370x208/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80', 80.00, 'Available', 3),
                                                                                             (4, 'Ford Mustang', 'Ford', 'Sports', 'Red', 'PETROL', 'https://imgd.aeplcdn.com/370x208/n/cw/ec/159099/swift-exterior-right-front-three-quarter-31.jpeg?isig=0&q=80', 70.00, 'Available', 3),
                                                                                             (5, 'Hyundai Tucson', 'Hyundai', 'SUV', 'Black', 'DIESEL', 'https://imgd.aeplcdn.com/370x208/n/cw/ec/174325/carens-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80', 60.00, 'Available', 4);

-- 4. Insert Bookings
INSERT INTO bookings (id, customerId, carId, startDate, endDate, totalPrice, status) VALUES
                                                                                         (1, 2, 1, '2024-05-15', '2024-05-20', 250.00, 'Confirmed'),  -- customerId = 2 (John Doe), carId = 1 (Toyota Camry)
                                                                                         (2, 3, 3, '2024-05-18', '2024-05-25', 560.00, 'Pending'),    -- customerId = 3 (Jane Smith), carId = 3 (Tesla Model 3)
                                                                                         (3, 4, 5, '2024-05-20', '2024-05-22', 120.00, 'Confirmed');   -- customerId = 4 (Mike Johnson), carId = 5 (Hyundai Tucson)

