package com.btec.cooking_backend.repositories;

import com.btec.cooking_backend.entities.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    Page<Recipe> findByStatusContainingIgnoreCase(String status, Pageable pageable);

    @Query("{ 'title': { $regex: ?0, $options: 'i' }, 'status': { $regex: ?1, $options: 'i' } }")
    Page<Recipe> search(String title, String status, Pageable pageable);

    @Query("{ 'title': { $regex: ?0, $options: 'i' } }")
    Page<Recipe> searchByTitle(String title, Pageable pageable);
}
