package com.btec.cooking_backend.repositories;

import com.btec.cooking_backend.entities.RecipeFavourite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeFavouriteRepository extends MongoRepository<RecipeFavourite, String> {
    Optional<RecipeFavourite> findByRecipeIdAndUserId(String recipeId, String userId);

    Page<RecipeFavourite> findByUserId(String userId, Pageable pageable);
}
