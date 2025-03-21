package com.btec.cooking_backend.model.req.comment;

public class SendComment {
    private String productId;
    private String message;
    private String parentId; // ID của bình luận cha (nếu có)

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
}
