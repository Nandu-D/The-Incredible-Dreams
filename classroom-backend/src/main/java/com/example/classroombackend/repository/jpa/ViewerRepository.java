package com.example.classroombackend.repository.jpa;

import com.example.classroombackend.model.jpa.Viewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewerRepository extends JpaRepository<Viewer, Long> {
}
