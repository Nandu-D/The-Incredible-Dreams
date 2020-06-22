package com.example.classroombackend.repository.jpa;

import com.example.classroombackend.model.jpa.Screen;
import com.example.classroombackend.model.jpa.Viewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ViewerRepository extends JpaRepository<Viewer, Long> {
    Optional<List<Viewer>> findAllByScreen(Screen screen);
}
