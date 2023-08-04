package com.example.trial.custom;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), ex.getMessage());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    // Add more exception handlers for other common errors

    // Example:
    // @ExceptionHandler(ValidationException.class)
    // public ResponseEntity<ErrorMessage> handleValidationException(ValidationException ex, WebRequest request) {
    //     ErrorMessage errorMessage = new ErrorMessage(new Date(), ex.getMessage());
    //     return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    // }

    // Custom error message class
    private static class ErrorMessage {
        private final Date timestamp;
        private final String message;

        public ErrorMessage(Date timestamp, String message) {
            this.timestamp = timestamp;
            this.message = message;
        }

        public Date getTimestamp() {
            return timestamp;
        }

        public String getMessage() {
            return message;
        }
    }
}
