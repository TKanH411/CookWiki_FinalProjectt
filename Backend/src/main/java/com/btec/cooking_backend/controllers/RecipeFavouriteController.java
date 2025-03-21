package com.btec.cooking_backend.controllers;

import com.btec.cooking_backend.entities.Recipe;
import com.btec.cooking_backend.entities.RecipeFavourite;
import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.services.RecipeFavouriteService;
import com.btec.cooking_backend.services.RecipeService;
import com.btec.cooking_backend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static com.btec.cooking_backend.security.JwtUtil.validateToken;

@RestController
@RequestMapping("/api/recipe-favourite")
public class RecipeFavouriteController {
    private final RecipeService recipeService;
    private final RecipeFavouriteService recipeFavouriteService;
    private final UserService userService;

    // Constructor injection
    public RecipeFavouriteController(RecipeService recipeService, RecipeFavouriteService recipeFavouriteService, UserService userService) {
        this.recipeService = recipeService;
        this.recipeFavouriteService = recipeFavouriteService;
        this.userService = userService;
    }

    @GetMapping("/get-favourite")
    public ResponseEntity<RecipeFavourite> getFavourite(@RequestParam String recipeId, HttpServletRequest request) throws Exception {
        Claims claims = validateToken(request);
        User user = userService.getUserByEmail(claims.getSubject());

        Optional<RecipeFavourite> favourite = recipeFavouriteService.getFavouriteByRecipeAndUser(recipeId, user.getId());
        return favourite.map(ResponseEntity::ok).orElse(ResponseEntity.status(200).body(new RecipeFavourite()));
    }

    @PostMapping("/toggle-favourite")
    public ResponseEntity<?> toggleRecipeFavourite(
            @RequestBody Map<String, String> requestBody,
            HttpServletRequest request
    ) throws Exception {
        Claims claims = validateToken(request);
        User user = userService.getUserByEmail(claims.getSubject());

        String recipeId = requestBody.get("recipeId");
        Recipe recipe = recipeService.getRecipeById(recipeId);
        if (recipe == null || !Objects.equals(recipe.getStatus(), RecipeService.STATUS_PUBLISHED)) {
            return ResponseEntity.notFound().build();
        }

        Optional<RecipeFavourite> existingFavourite = recipeFavouriteService.getFavouriteByRecipeAndUser(recipeId, user.getId());

        if (existingFavourite.isPresent()) {
            // Nếu đã có -> Xóa
            recipeFavouriteService.removeRecipeFavourite(existingFavourite.get());
            return ResponseEntity.ok(Map.of("message", "Removed from favourites"));
        } else {
            // Nếu chưa có -> Thêm mới
            RecipeFavourite recipeFavourite = new RecipeFavourite();
            recipeFavourite.setRecipe(recipe);
            recipeFavourite.setUser(user);
            RecipeFavourite savedFavourite = recipeFavouriteService.addRecipeFavourite(recipeFavourite);
            return ResponseEntity.ok(savedFavourite);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserFavouriteRecipes(
            HttpServletRequest request,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) throws Exception {
        Claims claims = validateToken(request);
        User user = userService.getUserByEmail(claims.getSubject());

        Page<RecipeFavourite> favouriteRecipes = recipeFavouriteService.getFavouriteRecipesByUser(user.getId(), page - 1, size);

        Map<String, Object> response = new HashMap<>();
        response.put("recipes", favouriteRecipes.getContent());
        response.put("currentPage", favouriteRecipes.getNumber());
        response.put("totalItems", favouriteRecipes.getTotalElements());
        response.put("totalPages", favouriteRecipes.getTotalPages());

        return ResponseEntity.ok(response);
    }
}
