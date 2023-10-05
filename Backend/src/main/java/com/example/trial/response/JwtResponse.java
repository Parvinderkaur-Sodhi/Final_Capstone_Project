package com.example.trial.response;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String role;
    private String username;
    private String email;

    public JwtResponse(String accessToken, Long id, String role, String username, String email) {
        this.token = accessToken;
        this.id = id;
        this.role = role;
        this.username = username;
        this.email = email;

    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
