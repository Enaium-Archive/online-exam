package com.example.server.model;

import org.babyfish.jimmer.sql.EnumItem;

public enum QuestionType {
    @EnumItem(name = "single")
    SINGLE,
    @EnumItem(name = "multi")
    MULTI,
    @EnumItem(name = "judgment")
    JUDGMENT,
    @EnumItem(name = "fill")
    FILL
}
