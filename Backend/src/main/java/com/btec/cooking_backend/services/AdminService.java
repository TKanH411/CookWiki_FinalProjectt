package com.btec.cooking_backend.services;

import com.btec.cooking_backend.entities.Admin;
import com.btec.cooking_backend.entities.User;
import com.btec.cooking_backend.repositories.AdminRepository;
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
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private static final String FIXED_ADMIN_EMAIL = "admin@example.com"; // Email cố định của admin
    private static final String FIXED_ADMIN_PASSWORD = "admin123"; // Mật khẩu cố định của admin

    /**
     * Kiểm tra tài khoản admin.
     */
    public boolean validateAdminCredentials(String email, String password) {
        return FIXED_ADMIN_EMAIL.equals(email) && FIXED_ADMIN_PASSWORD.equals(password);
    }

    /**
     * Lấy thông tin admin dựa trên email
     */
    public Admin getAdminByEmail(String email) {
        if (FIXED_ADMIN_EMAIL.equals(email)) {
            return new Admin(email, FIXED_ADMIN_PASSWORD, "ADMIN");
        }
        return null;
    }

    // Không cho phép tạo hoặc xóa admin
    public Admin createAdmin(Admin admin) {
        throw new UnsupportedOperationException("Cannot create admin accounts.");
    }

    public void deleteAdmin(String id) {
        throw new UnsupportedOperationException("Cannot delete admin accounts.");
    }
}
