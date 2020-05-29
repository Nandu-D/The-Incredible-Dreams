package com.example.classroombackend.controllers;

import com.example.classroombackend.model.response.UnsplashImageUrlList;
import com.example.classroombackend.services.UnsplashImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class BackgroundImagesController {

    private UnsplashImagesService unsplashImagesService;

    @Autowired
    public BackgroundImagesController(UnsplashImagesService unsplashImagesService) {
        this.unsplashImagesService = unsplashImagesService;
    }

    @GetMapping("/imageUrls")
    private UnsplashImageUrlList getBackgroundUrls() {
        return unsplashImagesService.getListOfImageDetails();
    }

}
