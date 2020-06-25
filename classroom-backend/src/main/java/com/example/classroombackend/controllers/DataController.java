package com.example.classroombackend.controllers;

import com.example.classroombackend.exception.ResourceNotFoundException;
import com.example.classroombackend.model.jpa.Group;
import com.example.classroombackend.model.jpa.Screen;
import com.example.classroombackend.model.jpa.User;
import com.example.classroombackend.model.jpa.Viewer;
import com.example.classroombackend.model.request.SaveGroupsRequest;
import com.example.classroombackend.model.request.SaveNamesRequest;
import com.example.classroombackend.model.request.SaveNotesRequest;
import com.example.classroombackend.model.request.SetBackgroundRequest;
import com.example.classroombackend.model.response.ApiResponse;
import com.example.classroombackend.model.response.UnsplashImageUrlList;
import com.example.classroombackend.repository.jpa.GroupRepository;
import com.example.classroombackend.repository.jpa.ScreenRepository;
import com.example.classroombackend.repository.jpa.UserRepository;
import com.example.classroombackend.repository.jpa.ViewerRepository;
import com.example.classroombackend.security.JwtTokenProvider;
import com.example.classroombackend.security.UserPrincipal;
import com.example.classroombackend.services.UnsplashImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/data")
public class DataController {

    private UnsplashImagesService unsplashImagesService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ScreenRepository screenRepository;
    @Autowired
    private GroupRepository groupRepository;
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
            for (Viewer viewer : items) {
                viewerRepository.delete(viewer);
            }
        });
        Set<Viewer> viewers = new HashSet<>();
        for (String name : namesArray) {
            Viewer viewer = new Viewer(name, "SCREEN_VIEWER", screen);
            viewers.add(viewerRepository.save(viewer));
        }

        return new ApiResponse(true, "Saved participant names");
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

    @PostMapping("saveGroups")
    private ApiResponse saveGroups(@RequestBody List<SaveGroupsRequest> groupsRequestList) {
        User user = getUser();
        Screen screen = user.getScreens().iterator().next();
        Optional<List<Group>> groupsOptional = groupRepository.findAllByScreen(screen);
        groupsOptional.ifPresent((groups) -> {
            for (Group group : groups) {
                groupRepository.delete(group);
            }
        });

        Set<Group> groupsSet = new HashSet<>();
        Set<Viewer> viewers = screen.getViewers();

        for (SaveGroupsRequest group: groupsRequestList) {
            Group newGroup = groupRepository.save(new Group(group.getGroupName(), screen));
            List<String> members = group.getMembers();
            for (String memberName: members) {
                for (Viewer viewer: viewers) {
                    if (viewer.getGroup() == null && viewer.getName().equals(memberName)) {
                        viewer.setGroup(newGroup);
                        newGroup.getMembers().add(viewer);
                        break;
                    }
                }
            }
            groupsSet.add(newGroup);
        }
        groupRepository.saveAll(groupsSet);
        viewerRepository.saveAll(viewers);

        return new ApiResponse(true, "Saved groups");
    }

    @GetMapping("getGroups")
    private List<SaveGroupsRequest> getGroups() {
        List<SaveGroupsRequest> groupsList = new ArrayList<>();

        User user = getUser();
        Screen screen = user.getScreens().iterator().next();
        List<Viewer> viewers = new ArrayList<>(screen.getViewers());
        List<Group> groups = new ArrayList<>(screen.getGroups());

        for (Group group: groups) {
            SaveGroupsRequest item = new SaveGroupsRequest();
            item.setGroupName(group.getName());
            List<String> members = viewers.stream()
                    .filter(e -> e.getGroup().getId() == group.getId())
                    .map(Viewer::getName)
                    .collect(Collectors.toList());
            item.setMembers(members);

            groupsList.add(item);
        }

        return groupsList;
    }

    private User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Long id = userPrincipal.getId();

        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
}
