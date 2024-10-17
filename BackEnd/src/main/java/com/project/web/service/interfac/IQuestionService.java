package com.project.web.service.interfac;

import com.project.web.dto.Response;


public interface IQuestionService {

    Response addQuestion(String titolo, String categoria, Long userID);

    Response getAllAnsweredQuestions();

    Response deleteQuestion(Long id);

    Response updateQuestion(Long id, String content);

    Response getAllNotAnsweredQuestions();


}
