package com.project.web.controller;


import com.project.web.dto.Response;
import com.project.web.exception.CustomExcept;
import com.project.web.model.User;
import com.project.web.repo.UserRepo;
import com.project.web.service.interfac.IQuestionService;
import com.project.web.service.interfac.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/FAQ")
public class QuestionController {

    @Autowired
    private IQuestionService questionService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private IUserService userService;

    /* PER AGGIUNGERE UNA NUOVA DOMANDA */
    @PostMapping("/add")
    public ResponseEntity<Response> addQuestion(@RequestParam(value = "title", required = false)String title,
                                                @RequestParam(value = "category", required = false) String category,
                                                @RequestParam(value = "userID", required = false)Long userID)
    {
        if(title == null || title.isEmpty()){
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide a title for the question!");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }else if(category == null || category.isEmpty()){
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide a category for the question!");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } else if (userID == null || userID < 0) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide an userID for the question!");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = new Response();
        try {

            response = questionService.addQuestion(title, category, userID);

        }catch(CustomExcept ex){

            response.setStatusCode(500);
            response.setMessage(ex.getMessage());
        }
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllAnsweredQuestions(){
        Response response = questionService.getAllAnsweredQuestions();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-not-answered")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllNotAnsweredQuestions(){
        Response response = questionService.getAllNotAnsweredQuestions();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/delete/{questionId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteQuestion(@PathVariable Long questionId){
        Response response = questionService.deleteQuestion(questionId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Aggiorna una domanda con una risposta (solo admin)
    @GetMapping("/update/{questionId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateQuestion(
            @PathVariable Long questionId,
            @RequestParam(value = "answer", required = false) String answer
    ) {
        if (answer == null || answer.isEmpty()) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide an answer for the question!");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        Response response = questionService.updateQuestion(questionId, answer);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
