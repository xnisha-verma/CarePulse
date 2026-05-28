package com.CarePulse.CarePulse.repository;

import com.CarePulse.CarePulse.model.Appointment;
import com.CarePulse.CarePulse.model.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Patient queries
    List<Appointment> findByPatient_Email(String email);
    List<Appointment> findByPatient_EmailAndAppointmentDateGreaterThanEqualOrderByAppointmentDateAscAppointmentTimeAsc(
            String email, LocalDate date);
    List<Appointment> findByPatient_EmailAndAppointmentDateLessThanOrderByAppointmentDateDescAppointmentTimeDesc(
            String email, LocalDate date);

    // Doctor queries (via doctor -> user -> email)
    List<Appointment> findByDoctor_User_Email(String email);
    List<Appointment> findByDoctor_User_EmailAndStatus(String email, AppointmentStatus status);
    List<Appointment> findByDoctor_User_EmailAndAppointmentDateAndStatus(
            String email, LocalDate date, AppointmentStatus status);

    // Double-booking check
    boolean existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNot(
            Long doctorId, LocalDate date, LocalTime time, AppointmentStatus excludedStatus);

    // Global queries for scheduling
    List<Appointment> findByAppointmentDateAndStatus(LocalDate date, AppointmentStatus status);
}