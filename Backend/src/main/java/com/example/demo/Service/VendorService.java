package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.User;
import com.example.demo.Model.Vendor;
import com.example.demo.Repository.VendorRepo;

@Service
public class VendorService {
    @Autowired
    VendorRepo vendorRepo;
    @Autowired
    UserService userService;
    public Boolean addNewVendor(Vendor vendor,int id) {
        if(vendor == null) return false;
        User user = userService.getUser(id);
        if(user == null)    return false;
        vendor.setUser(user);
        System.out.println(vendor.getPassword());
        // List<Vendor> myVendors = user.getVendors();
        // myVendors.add(vendor);
        // user.setVendors(myVendors);
        Vendor vendor2 = vendorRepo.save(vendor);
        return true;
    }
    public Boolean deleteVendor(int id) {
        Vendor toBeDeleted = vendorRepo.findById(id).orElse(null);
        if(toBeDeleted == null) return false;
        else {
            vendorRepo.delete(toBeDeleted);
            return true;
        }
    }
    public Vendor getVendorById(int id) {
        return vendorRepo.findById(id).orElse(null);
    }
}
