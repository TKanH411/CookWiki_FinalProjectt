package com.btec.cooking_backend.repositories;

import com.btec.cooking_backend.entities.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional   <Admin> findByEmail(String email);}
