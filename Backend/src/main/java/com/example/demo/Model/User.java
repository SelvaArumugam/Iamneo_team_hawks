package com.example.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
}
