package com.project.web.utils;

import com.project.web.dto.QuestionDTO;
import com.project.web.dto.UserDTO;
import com.project.web.dto.CategoryDTO;
import com.project.web.model.Question;
import com.project.web.model.User;
import com.project.web.model.Categoria;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public static String generateAlphaNumericString(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomChar = SECURE_RANDOM.nextInt(ALPHA_NUMERIC_STRING.length());
            char randomCharChar = ALPHA_NUMERIC_STRING.charAt(randomChar);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }


    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());

        return userDTO;
    }

    public static QuestionDTO mapQuestionEntityToQuestionDTO(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();

        questionDTO.setId(question.getId());
        questionDTO.setTitle(question.getTitle());
        questionDTO.setContent(question.getContent());
        questionDTO.setAnswered(question.getAnswered().toString());
        questionDTO.setCategory(question.getCategory().getId());
        questionDTO.setUserID(question.getUser().getId());
        return questionDTO;
    }

    public static CategoryDTO mapCategoryEntityToCategoryDTO(Categoria category) {
        CategoryDTO categoryDTO = new CategoryDTO();

        categoryDTO.setId(category.getId());
        categoryDTO.setType(category.getType());
        return categoryDTO;
    }

    public static List<UserDTO> mapUserEntityToUserDTOList(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<QuestionDTO> mapQuestionEntityToQuestionDTOList(List<Question> questionList) {
        return questionList.stream().map(Utils::mapQuestionEntityToQuestionDTO).collect(Collectors.toList());
    }

    public static List<CategoryDTO> mapCategoryEntityToCategoryDTOList(List<Categoria> categoryList) {
        return categoryList.stream().map(Utils::mapCategoryEntityToCategoryDTO).collect(Collectors.toList());
    }





}
