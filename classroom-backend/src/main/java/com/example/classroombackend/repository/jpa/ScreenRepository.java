package com.example.classroombackend.repository.jpa;

import com.example.classroombackend.model.jpa.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Long> {

}
