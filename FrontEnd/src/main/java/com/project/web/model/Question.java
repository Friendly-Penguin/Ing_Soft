package com.project.web.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name = "question")

public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title required")
    @Size(max = 300, message = "Max 300 characters")
    private String title;
    @Size(max = 300, message = "Max 300 characters")
    private String content;
    @NotNull
    @Column(name = "answered", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean answered = false;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "FK_QUESTION_USER"))
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id", foreignKey = @ForeignKey(name = "FK_QUESTION_CATEGORY"))
    private Category categoryType;
}
