package com.example.classroombackend.model.request;

import java.util.ArrayList;
import java.util.List;

public class SaveGroupsRequest {
    private String groupName;
    private List<String> members = new ArrayList<>();

    public SaveGroupsRequest() {
    }

    public SaveGroupsRequest(String groupName, List<String> members) {
        this.groupName = groupName;
        this.members = members;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }
}
