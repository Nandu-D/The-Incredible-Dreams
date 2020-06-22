package com.example.classroombackend.model.request;

import java.util.ArrayList;
import java.util.List;

public class SaveNamesRequest {
    private List<String> names = new ArrayList<>();

    public SaveNamesRequest() {
    }

    public SaveNamesRequest(List<String> names) {
        this.names = names;
    }

    public List<String> getNames() {
        return names;
    }

    public void setNames(List<String> names) {
        this.names = names;
    }
}
