package com.btec.cooking_backend.services;

import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private static final Map<String, String> ADMIN_ACCOUNTS = new HashMap<>();

    static {
        ADMIN_ACCOUNTS.put("duythanh999@example.com", "admin123");
        ADMIN_ACCOUNTS.put("duyan999@example.com", "admin456");
    }

    public boolean isAdmin(String email) {
        return ADMIN_ACCOUNTS.containsKey(email);
    }

    public boolean validateAdminCredentials(String email, String password) {
        return ADMIN_ACCOUNTS.containsKey(email) && ADMIN_ACCOUNTS.get(email).equals(password);
    }
    public User createUser(User user) {
        // Hash the password before saving
        // Kiểm tra nếu email thuộc danh sách admin thì không cho phép tạo
        if (ADMIN_ACCOUNTS.containsKey(user.getEmail())) {
            throw new RuntimeException("Admin accounts cannot be created.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("user"); // Tất cả user mới chỉ có role "user"

        return userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User updateUser(String id, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setBirthDay(updatedUser.getBirthDay());
            user.setActive(updatedUser.isActive());
            user.setAddress(updatedUser.getAddress());
            return userRepository.save(user);
        }
        return null;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

}
