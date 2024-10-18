package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

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
    public int LoginPassword(String email,String password)
    {

        try{

            List<User> users = userRepo.findByEmail(email);
            System.out.println("hello");

            if(users.size() == 0)
                return 1;
            User user = users.get(0);
            if(user.getPassword().equals(password))
            {
                return 2;
            }
            else{
                return 3;
            }
        }catch(Exception e)
        {
            System.out.println(email);
            return -1;
        }
    }
}
