package com.example.classroombackend.model.jpa;

import javax.persistence.*;
import java.util.*;

@Entity
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String backgroundUrl;
    private String notes;
    @ManyToOne(fetch=FetchType.LAZY)
    private User user;
    @OneToMany(mappedBy = "screen", cascade = CascadeType.REMOVE)
    private Set<Viewer> viewers = new HashSet<>();
    @OneToMany(mappedBy = "screen", cascade = CascadeType.REMOVE)
    private Set<Group> groups = new HashSet<>();

    public Screen() {
    }

    public Screen(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Screen(String name, User user, String backgroundUrl) {
        this.name = name;
        this.user = user;
        this.backgroundUrl = backgroundUrl;
    }

    public Screen(User user, Set<Viewer> viewers, Set<Group> groups) {
        this.user = user;
        this.viewers = viewers;
        this.groups = groups;
    }

    public Screen(Long id, User user, Set<Viewer> viewers, Set<Group> groups) {
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

    public String getBackgroundUrl() {
        return backgroundUrl;
    }

    public void setBackgroundUrl(String backgroundUrl) {
        this.backgroundUrl = backgroundUrl;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Set<Viewer> getViewers() {
        return viewers;
    }

    public void setViewers(Set<Viewer> viewers) {
        this.viewers = viewers;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
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
