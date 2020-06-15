package com.example.classroombackend.model.request;

public class SetBackgroundRequest {
    private String backgroundUrl;

    public String getBackgroundUrl() {
        return backgroundUrl;
    }

    public void setBackgroundUrl(String backgroundUrl) {
        this.backgroundUrl = backgroundUrl;
    }

    @Override
    public String toString() {
        return "SetBackgroundRequest{" +
                "backgroundUrl='" + backgroundUrl + '\'' +
                '}';
    }
}
