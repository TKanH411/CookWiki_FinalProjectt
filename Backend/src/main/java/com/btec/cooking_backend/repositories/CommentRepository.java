package com.btec.cooking_backend.repositories;

import com.btec.cooking_backend.entities.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByProductIdAndParentIdIsNull(String productId); // Lấy danh sách bình luận chính của sản phẩm
    List<Comment> findByParentId(String parentId); // Lấy danh sách reply theo bình luận cha
}
