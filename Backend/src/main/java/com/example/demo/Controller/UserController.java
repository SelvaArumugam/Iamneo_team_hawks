package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.User;
import com.example.demo.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    public UserService userService;
    @PostMapping("/register")
    ResponseEntity<String> addNewUser(@RequestBody User user)
    {
        Boolean userAdded = userService.addNewUser(user);
        if(userAdded == false)  return new ResponseEntity<>("User not registered", HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>("User registered Successfully",HttpStatus.CREATED);
    }
}
