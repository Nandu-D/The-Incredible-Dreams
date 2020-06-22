package com.example.classroombackend.controllers;

import com.example.classroombackend.exception.ResourceNotFoundException;
import com.example.classroombackend.model.jpa.Screen;
import com.example.classroombackend.model.jpa.User;
import com.example.classroombackend.model.jpa.Viewer;
import com.example.classroombackend.model.request.SaveNamesRequest;
import com.example.classroombackend.model.request.SaveNotesRequest;
import com.example.classroombackend.model.request.SetBackgroundRequest;
import com.example.classroombackend.model.response.ApiResponse;
import com.example.classroombackend.model.response.UnsplashImageUrlList;
import com.example.classroombackend.repository.jpa.ScreenRepository;
import com.example.classroombackend.repository.jpa.UserRepository;
import com.example.classroombackend.repository.jpa.ViewerRepository;
import com.example.classroombackend.security.CustomUserDetailsService;
import com.example.classroombackend.security.JwtTokenProvider;
import com.example.classroombackend.security.UserPrincipal;
import com.example.classroombackend.services.UnsplashImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/data")
public class DataController {

    private UnsplashImagesService unsplashImagesService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ScreenRepository screenRepository;
    @Autowired
    private ViewerRepository viewerRepository;
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
        Screen screen = userFromRepo.getScreens().iterator().next();
        screen.setBackgroundUrl(setBackgroundRequest.getBackgroundUrl());
        screenRepository.save(screen);

        return new ApiResponse(true, "in setbackground");
    }

    @GetMapping("/getSavedBackground")
    private ApiResponse getSavedBackground() {
        User userFromRepo = getUser();
        Screen screen = userFromRepo.getScreens().iterator().next();
        return new ApiResponse(true, screen.getBackgroundUrl());
    }

    @PostMapping("/saveNotes")
    private ApiResponse saveNotes(@RequestBody SaveNotesRequest saveNotesRequest) {
        User userFromRepo = getUser();
        Screen screen = userFromRepo.getScreens().iterator().next();
        screen.setNotes(saveNotesRequest.getNotes());
        screenRepository.save(screen);

        return new ApiResponse(true, "Got Notes: " + saveNotesRequest.getNotes());
    }

    @GetMapping("/getNotes")
    private ApiResponse getNotes() {
        User user = getUser();
        Screen screen = user.getScreens().iterator().next();
        return new ApiResponse(true, screen.getNotes());
    }

    @PostMapping("/saveNames")
    private ApiResponse saveNames(@RequestBody SaveNamesRequest saveNamesRequest) {
        User user = getUser();
        Screen screen = user.getScreens().iterator().next();
        List<String> namesArray = saveNamesRequest.getNames();
        Optional<List<Viewer>> viewersOptional = viewerRepository.findAllByScreen(screen);
        viewersOptional.ifPresent((items) -> {
            for (Viewer viewer: items) {
                viewerRepository.delete(viewer);
            }
        });
        Set<Viewer> viewers = new HashSet<>();
        for (String name: namesArray) {
            Viewer viewer = new Viewer(name, "SCREEN_VIEWER", screen);
            viewers.add(viewerRepository.save(viewer));
        }
        screen.setViewers(viewers);

        return new ApiResponse(true, "Saved elements");
    }

    @GetMapping("getNames")
    private SaveNamesRequest getNames() {
        User user = getUser();
        Screen screen = user.getScreens().iterator().next();
        Set<Viewer> viewers = screen.getViewers();
        List<String> names = new ArrayList<>();

        Iterator<Viewer> iterator = viewers.iterator();
        while (iterator.hasNext()) {
            Viewer viewer = iterator.next();
            String name = viewer.getName();
            names.add(name);
        }

        return new SaveNamesRequest(names);


}

    private User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Long id = userPrincipal.getId();

        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
}
