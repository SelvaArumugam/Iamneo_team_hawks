package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.VendorRepo;

@Service
public class VendorService {
    @Autowired
    VendorRepo vendorRepo;
}
