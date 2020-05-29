package com.example.classroombackend.services;

import com.example.classroombackend.model.response.UnsplashImageUrlList;
import com.example.classroombackend.model.unsplashApiModel.Result;
import com.example.classroombackend.model.unsplashApiModel.UnsplashApiSearchResponseModel;

import java.util.List;

public interface UnsplashImagesService {
    UnsplashImageUrlList getListOfImageDetails();
}
