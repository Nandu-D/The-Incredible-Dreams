package com.example.classroombackend.model.jpa;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "screen")
    private List<Viewer> viewers = new ArrayList<>();
    @OneToMany(mappedBy = "screen")
    private List<Group> groups = new ArrayList<>();

    public Screen() {
    }

    public Screen(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Screen(User user, List<Viewer> viewers, List<Group> groups) {
        this.user = user;
        this.viewers = viewers;
        this.groups = groups;
    }

    public Screen(Long id, User user, List<Viewer> viewers, List<Group> groups) {
        this.id = id;
        this.user = user;
        this.viewers = viewers;
        this.groups = groups;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Viewer> getViewers() {
        return viewers;
    }

    public void setViewers(List<Viewer> viewers) {
        this.viewers = viewers;
    }

    public List<Group> getGroups() {
        return groups;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Screen screen = (Screen) o;
        return Objects.equals(id, screen.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
