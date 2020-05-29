package com.example.classroombackend.model.response;

import java.util.List;

public class UnsplashImageUrlList {
    private List<ImageDetails> imageDetailsList;

    public UnsplashImageUrlList() {
    }

    public UnsplashImageUrlList(List<ImageDetails> imageDetailsList) {
        this.imageDetailsList = imageDetailsList;
    }

    public List<ImageDetails> getImageDetailsList() {
        return imageDetailsList;
    }

    public void setImageDetailsList(List<ImageDetails> imageDetailsList) {
        this.imageDetailsList = imageDetailsList;
    }
}
