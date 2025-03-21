package com.btec.cooking_backend.controllers;

import com.btec.cooking_backend.entities.Comment;
import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.model.res.CommentRes;
import com.btec.cooking_backend.services.CommentService;
import com.btec.cooking_backend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import static com.btec.cooking_backend.security.JwtUtil.validateToken;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;

    @Autowired
    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendComment(@RequestBody com.btec.cooking_backend.model.req.comment.SendComment sendComment, HttpServletRequest request) {
        try {
            Claims claims = validateToken(request);
            User user = userService.getUserByEmail(claims.getSubject());

            // Kiểm tra xem có phải reply của reply không
            if (sendComment.getParentId() != null && !commentService.isValidReply(sendComment.getParentId())) {
                return ResponseEntity.badRequest().body("Không thể reply vào một reply khác!");
            }

            Comment comment = new Comment();
            comment.setSenderId(user.getId());
            comment.setProductId(sendComment.getProductId());
            comment.setMessage(sendComment.getMessage());
            comment.setCreatedDate(LocalDateTime.now());
            comment.setParentId(sendComment.getParentId());

            Comment createdComment = commentService.addComment(comment);
            return ResponseEntity.ok(createdComment);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<CommentRes>> getCommentsByProduct(@PathVariable String productId) {
        List<CommentRes> comments = commentService.getCommentsByProduct(productId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/replies/{parentId}")
    public ResponseEntity<List<CommentRes>> getReplies(@PathVariable String parentId) {
        List<CommentRes> replies = commentService.getReplies(parentId);
        return ResponseEntity.ok(replies);
    }
}
