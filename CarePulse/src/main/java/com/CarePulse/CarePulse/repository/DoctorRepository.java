package com.CarePulse.CarePulse.repository;

import com.CarePulse.CarePulse.model.Doctor;
import com.CarePulse.CarePulse.model.Specialization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser_Email(String email);
    Page<Doctor> findBySpecialization(Specialization specialization, Pageable pageable);
    Page<Doctor> findByUser_NameContainingIgnoreCase(String name, Pageable pageable);
    Page<Doctor> findByUser_NameContainingIgnoreCaseAndSpecialization(
            String name, Specialization specialization, Pageable pageable);
}