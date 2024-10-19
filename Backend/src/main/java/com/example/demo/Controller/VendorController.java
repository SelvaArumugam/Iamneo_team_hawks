package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Vendor;
import com.example.demo.Service.VendorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/vendor")
public class VendorController {
    @Autowired
    VendorService vendorService;
    @PostMapping("/addVendor")
    ResponseEntity<Boolean> addVendor(@RequestBody Vendor vendor, @RequestParam("id") int id)
    {
        System.out.println(id);
        Boolean vendorAdded = vendorService.addNewVendor(vendor, id);
        if(vendorAdded == false) return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }
    @GetMapping("/getVendor")
    ResponseEntity<Vendor> getVendor(@RequestParam("id") int id) {
        Vendor vendor = vendorService.getVendorById(id);
        return new ResponseEntity<>(vendor, HttpStatus.OK);
    }
    @DeleteMapping("/deleteVendor/{id}") 
    ResponseEntity<Boolean> deleteVendor(@RequestParam int id) {
        Boolean vendorDeleted = vendorService.deleteVendor(id);
        if(vendorDeleted == false) return new ResponseEntity<>(false,HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }
}
