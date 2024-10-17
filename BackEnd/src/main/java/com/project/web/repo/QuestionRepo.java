package com.project.web.repo;

import com.project.web.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Question, Long> {


    @Query("Select q from Question as q where q.user.id = :id_user ")
    List<Question> findByUserID(Long id_user);

    @Query("select q from Question as q where q.answered = FALSE order by q.id ASC ")
    List<Question> findByNotAnswered();

    @Query("select q from Question as q where q.answered = true order by q.id ASC")
    List<Question> findByAnswered();

}
