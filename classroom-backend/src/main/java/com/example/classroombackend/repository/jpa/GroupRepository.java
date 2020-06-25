package com.example.classroombackend.repository.jpa;

import com.example.classroombackend.model.jpa.Group;
import com.example.classroombackend.model.jpa.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<List<Group>> findAllByScreen(Screen screen);
}
