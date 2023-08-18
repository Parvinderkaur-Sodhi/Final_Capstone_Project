package com.example.trial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class AuthTrialApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthTrialApplication.class, args);
		
		
	}
	

	
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Change this to match your API endpoints
                .allowedOrigins("http://localhost:3000") // Allow requests from this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}
