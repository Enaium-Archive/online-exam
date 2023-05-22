package com.example.server.model.response;

import com.example.server.model.Answer;
import com.example.server.model.Question;
import lombok.Data;

@Data
public class QAResponse<Q extends Question, A extends Answer> {
    private final Q question;
    private final A answer;
}
