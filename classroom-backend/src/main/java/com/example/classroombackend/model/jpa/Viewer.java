package com.example.classroombackend.model.jpa;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Viewer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String role;
    @ManyToOne
    private Screen screen;
    @ManyToOne
    private Group group;

    public Viewer() {
    }

    public Viewer(String name, String role, Screen screen, Group group) {
        this.name = name;
        this.role = role;
        this.screen = screen;
        this.group = group;
    }

    public Viewer(Long id, String name, String role, Screen screen, Group group) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.screen = screen;
        this.group = group;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Viewer viewer = (Viewer) o;
        return Objects.equals(id, viewer.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
