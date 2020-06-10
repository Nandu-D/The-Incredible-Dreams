package com.example.classroombackend.repository.jpa;

import com.example.classroombackend.model.jpa.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}
