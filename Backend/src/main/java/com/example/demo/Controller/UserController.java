package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Login;
import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    public UserService userService;
    @PostMapping("/register")
    ResponseEntity<String> addNewUser(@RequestBody User user)
    {
        Boolean userAdded = userService.addNewUser(user);
        if(userAdded == false)  return new ResponseEntity<>("User not registered", HttpStatus.OK);
        return new ResponseEntity<>("User registered Successfully",HttpStatus.CREATED);
    }
    @PostMapping("/login")
    ResponseEntity<Integer> login(@RequestBody Login login)
    {
        Integer userVerified = userService.LoginPassword(login.getEmail(), login.getPassword());
        return new ResponseEntity<>(userVerified,HttpStatus.OK);
    }
}
