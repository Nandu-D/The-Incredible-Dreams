package com.example.classroombackend.model.response;

public class ImageDetails {
    private Integer width;
    private Integer height;
    private String description;
    private String thumbnailurl;
    private String fullimageurl;

    public ImageDetails() {
    }

    public ImageDetails(Integer width, Integer height, String description, String thumbnailurl, String fullimageurl) {
        this.width = width;
        this.height = height;
        this.description = description;
        this.thumbnailurl = thumbnailurl;
        this.fullimageurl = fullimageurl;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnailurl() {
        return thumbnailurl;
    }

    public void setThumbnailurl(String thumbnailurl) {
        this.thumbnailurl = thumbnailurl;
    }

    public String getFullimageurl() {
        return fullimageurl;
    }

    public void setFullimageurl(String fullimageurl) {
        this.fullimageurl = fullimageurl;
    }
}
