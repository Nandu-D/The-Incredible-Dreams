package com.example.classroombackend.services;

import com.example.classroombackend.model.response.ImageDetails;
import com.example.classroombackend.model.response.UnsplashImageUrlList;
import com.example.classroombackend.model.unsplashApiModel.Result;
import com.example.classroombackend.model.unsplashApiModel.UnsplashApiSearchResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UnsplashImagesServiceImpl implements UnsplashImagesService {

    private RestTemplate restTemplate;

    @Autowired
    public UnsplashImagesServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public UnsplashImageUrlList getListOfImageDetails() {
        List<Result> unsplashPhotosApiResponse = getUnsplashApiPhotosResponseCall();

        if (unsplashPhotosApiResponse.size() == 0) {
            return new UnsplashImageUrlList();
        }

        List<ImageDetails> resultingImageDetails = new ArrayList<>();
        for (Result singleResult : unsplashPhotosApiResponse) {
            ImageDetails imageDetails = new ImageDetails();
            imageDetails.setWidth(singleResult.getWidth());
            imageDetails.setHeight(singleResult.getHeight());
            imageDetails.setDescription(singleResult.getDescription());
            imageDetails.setThumbnailurl(singleResult.getUrls().getThumb());
            imageDetails.setFullimageurl(singleResult.getUrls().getRegular());

            resultingImageDetails.add(imageDetails);
        }

        return new UnsplashImageUrlList(resultingImageDetails);
    }

    private List<Result> getUnsplashApiPhotosResponseCall() {
        Result[] restTemplateForObject = restTemplate.getForObject("/photos", Result[].class);
        List<Result> response = (restTemplateForObject != null) ?
                Arrays.asList(restTemplateForObject) : null;

        System.out.println("Api response : " + response);

        return response;
    }

    private UnsplashApiSearchResponseModel getUnsplashApiSearchResponseCall() {
        return null;
    }
}
