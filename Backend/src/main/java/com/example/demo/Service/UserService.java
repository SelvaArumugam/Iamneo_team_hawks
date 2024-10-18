package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepo;

@Service
public class UserService {
    @Autowired
    public UserRepo userRepo;
    public Boolean  addNewUser(User user)
    {
        User user2 = userRepo.save(user);
        if(user2 == null)   return false;   
        return true;
    }
}
