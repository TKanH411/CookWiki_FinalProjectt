package com.btec.cooking_backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET_KEY = "Akjhsdfjkhsdfhsadhjaskdhasjkhdkjsahdjkashdjkashdjksahdjksadhsakjh"; // Use a secure key
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    /**
     * Generate a JWT token for a given email.
     *
     * @param email The user's email.
     * @return The JWT token.
     */
    public static String generateToken(String email) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 1 giờ
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public static Claims verifyToken(String token) throws Exception {
        try {
            Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

            // Xác minh JWT
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return claimsJws.getBody();
        } catch (JwtException e) {
            System.err.println("Invalid JWT: " + e.getMessage());
            return null;
        }
    }

    public static Claims validateToken(HttpServletRequest request) throws Exception {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new Exception("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7); // Extract the token part
        return JwtUtil.verifyToken(token); // Validate the token
    }

    // Existing methods for validation and claims extraction
}
