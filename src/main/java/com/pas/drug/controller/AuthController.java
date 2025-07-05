package com.pas.drug.controller;

import com.pas.drug.model.User;
import com.pas.drug.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // Same as your DrugController
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
        }
        user.setPassword(user.getPassword());
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

 @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody User user) {
    User existingUser = userRepository.findByUsername(user.getUsername());
    if (existingUser != null && user.getPassword().equals(existingUser.getPassword())) {
        return new ResponseEntity<>("Login successful", HttpStatus.OK);  // ✅ Use 200 instead of 302
    } else {
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }
}

}
