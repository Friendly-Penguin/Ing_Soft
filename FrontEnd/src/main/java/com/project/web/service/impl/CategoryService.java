package com.project.web.service.impl;

import com.project.web.dto.Response;
import com.project.web.dto.CategoryDTO;
import com.project.web.exception.CustomExcept;
import com.project.web.service.interfac.ICategoryService;
import org.springframework.transaction.annotation.Transactional;

public class CategoryService implements ICategoryService {


    @Override
    @Transactional(rollbackFor = Exception.class)
    public Response addCategory(String type) {

        Response response = new Response();

        try{
            Category category = new Category();

        }catch (Exception e){
            System.out.println(e);
            throw  new CustomExcept("Error adding new Category: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response deleteCategory(Long id) {
        return null;
    }

    @Override
    public Response getAllCategories() {
        return null;
    }
}
