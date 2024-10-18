package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.VendorService;

@RestController
public class VendorController {
    @Autowired
    VendorService vendorService;
}
