package com.btec.cooking_backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/images")
public class ImageUploadController {
    // Thư mục lưu trữ file upload
    private static final String uploadDir = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Vui lòng chọn file để upload");
        }
        try {
            // Tạo thư mục nếu chưa tồn tại
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Lấy tên file gốc và kiểm tra
            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null) {
                return ResponseEntity.badRequest().body("File không hợp lệ");
            }

            // Chuyển đổi tên file gốc sang tên an toàn
            String safeFileName = normalizeFileName(originalFileName);
            // Tách phần mở rộng nếu có
            int dotIndex = safeFileName.lastIndexOf('.');
            String baseName = dotIndex == -1 ? safeFileName : safeFileName.substring(0, dotIndex);
            String extension = dotIndex == -1 ? "" : safeFileName.substring(dotIndex);

            // Thêm chuỗi duy nhất vào tên file
            String uniqueSuffix = UUID.randomUUID().toString();
            String uniqueFileName = baseName + "_" + uniqueSuffix + extension;

            // Thiết lập đường dẫn lưu file với tên file duy nhất
            Path destination = uploadPath.resolve(uniqueFileName);

            // Lưu file
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            // Xây dựng URL hiển thị file (sẽ có dạng http://localhost:8080/uploads/uniqueFileName)
            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(uniqueFileName)
                    .toUriString();

            Map<String, String> response = new HashMap<>();
            response.put("file_url", fileUrl);
            response.put("msg", "File upload thành công: " + uniqueFileName);
            return ResponseEntity.ok(response);
        } catch (IOException ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload file thất bại: " + ex.getMessage());
        }
    }

    // Hàm chuyển đổi tên file thành dạng an toàn (không dấu, không khoảng trắng, chỉ cho phép a-z, 0-9, _ , - và .)
    private String normalizeFileName(String fileName) {
        // Loại bỏ dấu (diacritics)
        String normalized = Normalizer.normalize(fileName, Normalizer.Form.NFD);
        normalized = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        // Thay thế khoảng trắng bằng dấu gạch dưới
        normalized = normalized.replaceAll("\\s+", "_");
        // Loại bỏ các ký tự không hợp lệ
        normalized = normalized.replaceAll("[^a-zA-Z0-9._-]", "");
        return normalized;
    }
}
