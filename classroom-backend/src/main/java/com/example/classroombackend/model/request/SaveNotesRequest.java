package com.example.classroombackend.model.request;

public class SaveNotesRequest {
    private String notes;

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "SaveNotesRequest{" +
                "notes='" + notes + '\'' +
                '}';
    }
}
