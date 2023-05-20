package com.example.server.model.response;

import lombok.Data;
import org.jetbrains.annotations.NotNull;

@Data
public class LoginResponse {
    @NotNull
    private final Long id;
    @NotNull
    private final String token;
}
