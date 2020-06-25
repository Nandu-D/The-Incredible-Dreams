package com.example.classroombackend.model.jpa;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "screen_group")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @ManyToOne(fetch=FetchType.LAZY)
    private Screen screen;
    @OneToMany(mappedBy = "group")
    private Set<Viewer> members = new HashSet<>();

    public Group() {
    }

    public Group(String name, Screen screen) {
        this.name = name;
        this.screen = screen;
    }

    public Group(String name, Screen screen, Set<Viewer> members) {
        this.name = name;
        this.screen = screen;
        this.members = members;
    }

    public Group(Long id, String name, Screen screen, Set<Viewer> members) {
        this.id = id;
        this.name = name;
        this.screen = screen;
        this.members = members;
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

    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }

    public Set<Viewer> getMembers() {
        return members;
    }

    public void setMembers(Set<Viewer> members) {
        this.members = members;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Group group = (Group) o;
        return Objects.equals(id, group.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
