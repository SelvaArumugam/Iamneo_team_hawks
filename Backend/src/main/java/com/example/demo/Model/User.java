package com.example.demo.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "User")
@Entity
public class User {
    String userName;
    String email;
    String password;
    String type;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "vendorList")
    List<Vendor> vendors;
}
