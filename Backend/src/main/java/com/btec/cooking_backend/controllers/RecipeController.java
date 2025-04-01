package com.btec.cooking_backend.controllers;

import com.btec.cooking_backend.entities.Recipe;
import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.services.RecipeService;
import com.btec.cooking_backend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.btec.cooking_backend.security.JwtUtil.validateToken;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    private final RecipeService recipeService;
    private final UserService userService;

    // Constructor injection
    public RecipeController(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }

    @GetMapping("/verify")
    public ResponseEntity<?> getAllRecipesPublish(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) throws Exception {
        // Trừ 1 nếu client gửi 1-indexed
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> pageRecipes = recipeService.getRecipesPublishByPagination(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("recipes", pageRecipes.getContent());
        response.put("currentPage", pageRecipes.getNumber());
        response.put("totalItems", pageRecipes.getTotalElements());
        response.put("totalPages", pageRecipes.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllRecipes(
            @RequestParam String title,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // Trừ 1 nếu client gửi 1-indexed
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> pageRecipes = recipeService.getRecipesByPagination(title, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("recipes", pageRecipes.getContent());
        response.put("currentPage", pageRecipes.getNumber());
        response.put("totalItems", pageRecipes.getTotalElements());
        response.put("totalPages", pageRecipes.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable String id) {
        return recipeService.getRecipeById(id);
    }

    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe recipe, HttpServletRequest request) throws Exception {
        Claims claims = validateToken(request);
        User user = userService.getUserByEmail(claims.getSubject());

        recipe.setUser(user);
        recipe.setStatus("DRAFT");
        return recipeService.addRecipe(recipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable String id) {
        recipeService.deleteRecipe(id);
    }

    // API cập nhật status của Recipe
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateRecipeStatus(@PathVariable("id") String id, @RequestBody Map<String, String> payload) {
        String newStatus = payload.get("status");
        if (newStatus == null || newStatus.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("New status is required");
        }
        try {
            Recipe updatedRecipe = recipeService.changeStatus(id, newStatus.toUpperCase());
            return ResponseEntity.ok(updatedRecipe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchRecipesByTitle(
            @RequestParam String title,
            @RequestParam String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // Trừ 1 nếu client gửi 1-indexed
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> pageRecipes = recipeService.searchRecipes(title, status, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("recipes", pageRecipes.getContent());
        response.put("currentPage", pageRecipes.getNumber());
        response.put("totalItems", pageRecipes.getTotalElements());
        response.put("totalPages", pageRecipes.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable String id, @RequestBody Recipe recipeRequest) {
        Optional<Recipe> recipeData = Optional.ofNullable(recipeService.getRecipeById(id));

        if (recipeData.isPresent()) {
            Recipe recipe = recipeData.get();

            // Cập nhật các trường của Recipe
            recipe.setTitle(recipeRequest.getTitle());
            recipe.setImageThumb(recipeRequest.getImageThumb());
            recipe.setPortion(recipeRequest.getPortion());
            recipe.setTime(recipeRequest.getTime());
            recipe.setDescription(recipeRequest.getDescription());
            recipe.setStatus(recipeRequest.getStatus());
            recipe.setIngredients(recipeRequest.getIngredients());
            recipe.setCookSteps(recipeRequest.getCookSteps());
            // Nếu cần, bạn có thể cập nhật thông tin User:
            // recipe.setUser(recipeRequest.getUser());

            Recipe updatedRecipe = recipeService.save(recipe);
            return ResponseEntity.ok(updatedRecipe);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/my-recipes")
    public ResponseEntity<?> getMyRecipes(HttpServletRequest request,
                                          @RequestParam(defaultValue = "1") int page,
                                          @RequestParam(defaultValue = "10") int size) throws Exception {
        Claims claims = validateToken(request);
        User user = userService.getUserByEmail(claims.getSubject());

        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Recipe> pageRecipes = recipeService.getRecipesByUser(user.getId(), pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("recipes", pageRecipes.getContent());
        response.put("currentPage", pageRecipes.getNumber());
        response.put("totalItems", pageRecipes.getTotalElements());
        response.put("totalPages", pageRecipes.getTotalPages());

        return ResponseEntity.ok(response);
    }

}
