package com.btec.cooking_backend.services;

import com.btec.cooking_backend.entities.Comment;
import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.model.res.CommentRes;
import com.btec.cooking_backend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserService userService;

    @Autowired
    public CommentService(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<CommentRes> getCommentsByProduct(String productId) {
        List<Comment> comments = commentRepository.findByProductIdAndParentIdIsNull(productId);
        return comments.stream().map(this::mapToCommentResponse).collect(Collectors.toList());
    }

    public List<CommentRes> getReplies(String parentId) {
        List<Comment> replies = commentRepository.findByParentId(parentId);
        return replies.stream().map(this::mapToCommentResponse).collect(Collectors.toList());
    }

    private CommentRes mapToCommentResponse(Comment comment) {
        Optional<User> sender = userService.getUserById(comment.getSenderId()); // Lấy thông tin User từ UserService
        return new CommentRes(
                comment.getId(),
                sender.get(),
                comment.getProductId(),
                comment.getCreatedDate(),
                comment.getMessage(),
                comment.getParentId()
        );
    }

    public boolean isValidReply(String parentId) {
        if (parentId == null) return true;
        Optional<Comment> parentComment = commentRepository.findById(parentId);
        return parentComment.isPresent() && parentComment.get().getParentId() == null;
    }
}
