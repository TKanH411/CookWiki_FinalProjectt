package com.btec.cooking_backend.model.res;

import com.btec.cooking_backend.entities.User;

import java.time.LocalDateTime;

public class CommentRes {
    private String id;
    private User sender;
    private String productId;
    private LocalDateTime createdDate;
    private String message;
    private String parentId;

    public CommentRes(String id, User sender, String productId, LocalDateTime createdDate, String message, String parentId) {
        this.id = id;
        this.sender = sender;
        this.productId = productId;
        this.createdDate = createdDate;
        this.message = message;
        this.parentId = parentId;
    }

    public String getId() {
        return id;
    }

    public User getSender() {
        return sender;
    }

    public String getProductId() {
        return productId;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public String getMessage() {
        return message;
    }

    public String getParentId() {
        return parentId;
    }
}
