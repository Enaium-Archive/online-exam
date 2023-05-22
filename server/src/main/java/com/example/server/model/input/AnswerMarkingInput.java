package com.example.server.model.input;

import lombok.Data;
import org.jetbrains.annotations.Nullable;

@Data
public class AnswerMarkingInput {
    @Nullable
    private Long id;
    @Nullable
    private String reason;
    @Nullable
    private Boolean state;
}
