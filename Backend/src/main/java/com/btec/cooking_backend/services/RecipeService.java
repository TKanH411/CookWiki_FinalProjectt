package com.btec.cooking_backend.services;

import com.btec.cooking_backend.entities.Recipe;
import com.btec.cooking_backend.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    public static final String STATUS_DRAFT = "DRAFT";
    public static final String STATUS_PENDING = "PENDING";
    public static final String STATUS_PUBLISHED = "PUBLISHED";
    public static final String STATUS_REJECTED = "REJECTED";

    @Autowired
    private RecipeRepository recipeRepository;

    public Page<Recipe> getRecipesPublishByPagination(Pageable pageable) {
        return recipeRepository.findByStatusContainingIgnoreCase("PUBLISH", pageable);
    }

    public Page<Recipe> getRecipesByPagination(String title, Pageable pageable) {
        return recipeRepository.searchByTitle(title, pageable);
    }
    public Page<Recipe> getRecipesByUser(String userId, Pageable pageable) {
        return recipeRepository.findByUserId(userId, pageable);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(String id) {
        return recipeRepository.findById(id).orElse(null);
    }

    public Recipe addRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(String id) {
        recipeRepository.deleteById(id);
    }

    public Recipe changeStatus(String id, String newStatus) throws Exception {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new Exception("Recipe not found with id: " + id));
        recipe.setStatus(newStatus);
        return recipeRepository.save(recipe);
    }

    public Page<Recipe> searchRecipes(String title, String status, Pageable pageable) {
        return recipeRepository.search(title, status, pageable);
    }

    public Recipe save(Recipe recipe) {
        return recipeRepository.save(recipe);
    }
}
