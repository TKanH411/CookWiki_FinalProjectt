package com.btec.cooking_backend.services;

import com.btec.cooking_backend.entities.RecipeFavourite;
import com.btec.cooking_backend.repositories.RecipeFavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecipeFavouriteService {
    @Autowired
    private RecipeFavouriteRepository recipeFavouriteRepository;

    public RecipeFavourite addRecipeFavourite(RecipeFavourite recipeFavourite) {
        return recipeFavouriteRepository.save(recipeFavourite);
    }

    public void removeRecipeFavourite(RecipeFavourite recipeFavourite) {
        recipeFavouriteRepository.delete(recipeFavourite);
    }

    public Optional<RecipeFavourite> getFavouriteByRecipeAndUser(String recipeId, String userId) {
        return recipeFavouriteRepository.findByRecipeIdAndUserId(recipeId, userId);
    }

    public Page<RecipeFavourite> getFavouriteRecipesByUser(String userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recipeFavouriteRepository.findByUserId(userId, pageable);
    }

}
