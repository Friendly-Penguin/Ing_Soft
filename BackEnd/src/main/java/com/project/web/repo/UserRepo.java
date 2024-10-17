package com.project.web.repo;

import com.project.web.model.Question;
import com.project.web.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("Select u.id from User as u where u.email = :email ")
    Long findUserIDByEmail(String email);

}
