package com.btec.cooking_backend.controllers;

import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.security.JwtUtil;
import com.btec.cooking_backend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.btec.cooking_backend.security.JwtUtil.validateToken;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Endpoint đăng ký người dùng
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // Endpoint đăng nhập
    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        User user = userService.getUserByEmail(email);
        if (user == null || !userService.checkPassword(password, user.getPassword())) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
        String token = JwtUtil.generateToken(user.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Endpoint lấy cấu hình người dùng (thông tin người dùng)
    @PostMapping("/config")
    public ResponseEntity<?> config(HttpServletRequest request) {
        try {
            Claims claims = validateToken(request);
            User user = userService.getUserByEmail(claims.getSubject());
            Map<String, String> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("address", user.getAddress());
            response.put("id", user.getId());
            response.put("birthday", user.getBirthDay());
            response.put("name", user.getFirstName() + " " + user.getLastName());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving user information", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint đổi mật khẩu
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody Map<String, String> passwordRequest) {
        try {
            // Validate JWT token and retrieve the authenticated user
            Claims claims = validateToken(request);
            User user = userService.getUserByEmail(claims.getSubject());

            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            String oldPassword = passwordRequest.get("currentPassword");
            String newPassword = passwordRequest.get("newPassword");
            String confirmPassword = passwordRequest.get("confirmPassword");

            // Call UserService to change the password
            boolean isPasswordChanged = userService.changePassword(user, oldPassword, newPassword, confirmPassword);

            if (isPasswordChanged) {
                return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Incorrect current password or passwords don't match", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error changing password: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
