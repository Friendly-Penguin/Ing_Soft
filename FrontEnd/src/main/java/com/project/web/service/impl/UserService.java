package com.project.web.service.impl;

import com.project.web.dto.LoginRequest;
import com.project.web.dto.Response;
import com.project.web.dto.UserDTO;
import com.project.web.exception.CustomExcept;
import com.project.web.model.User;
import com.project.web.repo.UserRepo;
import com.project.web.service.interfac.IUserService;
import com.project.web.utils.JWTUtils;
import com.project.web.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public Response register(User user) {

        Response response = new Response();

        try{

            if(user.getRole() == null || user.getRole().isBlank()){
                user.setRole("USER");
            }

            if(userRepo.existsByEmail(user.getEmail())){
                throw new CustomExcept(user.getEmail() + "Already Exist");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepo.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);


        }catch (CustomExcept ex){
            response.setStatusCode(400);
            response.setMessage(ex.getMessage());

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error in User registration: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response login(LoginRequest loginUser) {

        Response response = new Response();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword()));
            var user = userRepo.findByEmail(loginUser.getEmail()).orElseThrow(() -> new CustomExcept("User not Found"));
            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setUserID(user.getId());
            response.setExpirationTime("1 Days");
            response.setMessage("successfull");

        }catch (CustomExcept ex){

            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception e){

            response.setStatusCode(500);
            response.setMessage("Error in User login: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAllUser() {

        Response response = new Response();

        try{
            List<User> users = userRepo.findAll();
            List<UserDTO> userDTOList = Utils.mapUserEntityToUserDTOList(users);


            response.setStatusCode(200);
            response.setMessage("Success");
            response.setUserDTOList(userDTOList);

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error retriving answered Question " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response deleteUser(String userID) {

        Response response = new Response();

        try{

            userRepo.findById(Long.valueOf(userID)).orElseThrow(() -> new CustomExcept("User not Found"));
            userRepo.deleteById(Long.valueOf(userID));
            response.setStatusCode(200);
            response.setMessage("successfull");



        }catch (CustomExcept ex){

            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception e){

            response.setStatusCode(500);
            response.setMessage("Error in User deleting: " + e.getMessage());
        }


        return response;
    }

    @Override
    public Response getUserByID(String userID) {

        Response response = new Response();
        try{

            User user = userRepo.findById(Long.valueOf(userID)).orElseThrow(() -> new CustomExcept("User not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setUser(userDTO);

        }catch (CustomExcept ex){

            response.setStatusCode(404);
            response.setMessage(ex.getMessage());

        }catch (Exception e){

            response.setStatusCode(500);
            response.setMessage("Error in User retriving: " + e.getMessage());
        }


        return response;
    }

    @Override
    public Response getMyInfo(String email) {

        Response response = new Response();

        try{

            User user = userRepo.findByEmail(email).orElseThrow(() -> new CustomExcept("User not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("successfull");
            response.setUser(userDTO);

        }catch (CustomExcept ex){

            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception e){

            response.setStatusCode(500);
            response.setMessage("Error in User info retriving: " + e.getMessage());
        }


        return response;
    }
}
