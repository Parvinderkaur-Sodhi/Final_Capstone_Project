package com.example.trial.security.services;

import java.util.Collection;
import java.util.Objects;

import com.example.trial.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String role;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    public UserDetailsImpl(Long id, String role, String username, String email, String password) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.email = email;
        this.password = password;

    }

    public static UserDetailsImpl build(User user) {

        return new UserDetailsImpl(user.getId(), user.getRole(), user.getUsername(), user.getEmail(), user.getPassword());
    }

    public Long getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return null;
    }
}