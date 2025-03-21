package com.btec.cooking_backend.entities;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public class CookStep {

    private String id;
    private String description;

    @Field("image_urls")
    private List<String> imageUrls;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}