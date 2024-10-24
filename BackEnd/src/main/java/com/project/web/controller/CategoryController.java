package com.project.web.controller;

import com.project.web.dto.Response;
import com.project.web.exception.CustomExcept;
import com.project.web.repo.CategoryRepo;
import com.project.web.service.interfac.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @Autowired
    private CategoryRepo categoryRepo;


    /* PER AGGIUNGERE UNA NUOVA CATEGORIA */
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addCategory(@RequestParam(value = "categoryType", required = false)String type)
    {
        if(type == null || type.isEmpty()){
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide a type for the category");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }

        Response response = new Response();
        try{

            response = categoryService.addCategory(type);

        }catch (CustomExcept ex){
            response.setStatusCode(500);
            response.setMessage(ex.getMessage());
        }

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    /* PER CANCELLARE UNA CATEGORIA */
    @PostMapping("/delete/{categoryID}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteCategory(@PathVariable Long categoryID){

        Response response =  categoryService.deleteCategory(categoryID);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    /* PER RECUPERARE TUTTE LE CATEGORIE */
    @GetMapping("/all")
    public ResponseEntity<Response> getAll(){

        Response response = categoryService.getAllCategories();
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

}
