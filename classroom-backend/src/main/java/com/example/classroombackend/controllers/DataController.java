package com.example.classroombackend.controllers;

import com.example.classroombackend.exception.ResourceNotFoundException;
import com.example.classroombackend.model.jpa.Screen;
import com.example.classroombackend.model.jpa.User;
import com.example.classroombackend.model.request.SaveNotesRequest;
import com.example.classroombackend.model.request.SetBackgroundRequest;
import com.example.classroombackend.model.response.ApiResponse;
import com.example.classroombackend.model.response.UnsplashImageUrlList;
import com.example.classroombackend.repository.jpa.ScreenRepository;
import com.example.classroombackend.repository.jpa.UserRepository;
import com.example.classroombackend.security.CustomUserDetailsService;
import com.example.classroombackend.security.JwtTokenProvider;
import com.example.classroombackend.security.UserPrincipal;
import com.example.classroombackend.services.UnsplashImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private UnsplashImagesService unsplashImagesService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ScreenRepository screenRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    public DataController(UnsplashImagesService unsplashImagesService, ScreenRepository screenRepository) {
        this.unsplashImagesService = unsplashImagesService;
        this.screenRepository = screenRepository;
    }

    @GetMapping("/imageUrls")
    private UnsplashImageUrlList getBackgroundUrls() {
        return unsplashImagesService.getListOfImageDetails();
    }

    @PostMapping("/setBackground")
    private ApiResponse setbackground(@RequestBody SetBackgroundRequest setBackgroundRequest) {
        User userFromRepo = getUser();
        Screen screen = userFromRepo.getScreens().get(0);
        screen.setBackgroundUrl(setBackgroundRequest.getBackgroundUrl());
        screenRepository.save(screen);

        return new ApiResponse(true, "in setbackground");
    }

    @GetMapping("/getSavedBackground")
    private ApiResponse getSavedBackground() {
        User userFromRepo = getUser();
        Screen screen = userFromRepo.getScreens().get(0);
        return new ApiResponse(true, screen.getBackgroundUrl());
    }

    @PostMapping("/saveNotes")
    private ApiResponse saveNotes(@RequestBody SaveNotesRequest saveNotesRequest) {
        System.out.println("Notes Api Response: " + saveNotesRequest.getNotes());
        User userFromRepo = getUser();
        Screen screen = userFromRepo.getScreens().get(0);
        screen.setNotes(saveNotesRequest.getNotes());
        screenRepository.save(screen);

        return new ApiResponse(true, "Got Notes: " + saveNotesRequest.getNotes());
    }

    @GetMapping("/getNotes")
    private ApiResponse getNotes() {
        System.out.println("in getNotes");
        User user = getUser();
        Screen screen = user.getScreens().get(0);
        System.out.println("notes from db: " + screen.getNotes());
        return new ApiResponse(true, screen.getNotes());
    }

    private User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Long id = userPrincipal.getId();

        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
}
