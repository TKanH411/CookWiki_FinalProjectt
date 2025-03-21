package com.btec.cooking_backend.repositories;

import com.btec.cooking_backend.entities.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByCreatedDateBetween(Date startDate, Date endDate);


}

