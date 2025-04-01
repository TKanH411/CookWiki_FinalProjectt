package com.btec.cooking_backend.services;

import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Phương thức tạo người dùng
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu trước khi lưu
        return userRepository.save(user);
    }

    // Lấy thông tin người dùng theo email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Kiểm tra mật khẩu (dùng trong sign-in)
    public boolean checkPassword(String inputPassword, String storedPassword) {
        return passwordEncoder.matches(inputPassword, storedPassword);
    }

    // Lấy tất cả người dùng
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy người dùng theo ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // Cập nhật thông tin người dùng
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

    // Xóa người dùng theo ID
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    // Lưu người dùng (hữu ích khi đổi mật khẩu)
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Phương thức đổi mật khẩu
    public boolean changePassword(User user, String currentPassword, String newPassword, String confirmPassword) {
        // Kiểm tra mật khẩu cũ có khớp không
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return false; // Mật khẩu cũ không chính xác
        }

        // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp không
        if (!newPassword.equals(confirmPassword)) {
            return false; // Mật khẩu mới và mật khẩu xác nhận không khớp
        }

        // Mã hóa mật khẩu mới
        user.setPassword(passwordEncoder.encode(newPassword));

        // Lưu lại thông tin người dùng với mật khẩu mới
        userRepository.save(user);

        return true; // Đổi mật khẩu thành công
    }
}
