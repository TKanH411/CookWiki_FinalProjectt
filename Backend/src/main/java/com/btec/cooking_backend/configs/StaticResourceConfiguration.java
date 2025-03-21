package com.btec.cooking_backend.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ánh xạ các request có URL bắt đầu bằng /uploads/ đến thư mục uploads trên hệ thống file
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}