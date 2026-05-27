package com.CarePulse.CarePulse.service;

import com.CarePulse.CarePulse.dto.AppointmentResponse;
import com.CarePulse.CarePulse.dto.BookingRequest;
import com.CarePulse.CarePulse.model.Appointment;
import com.CarePulse.CarePulse.model.AppointmentStatus;
import com.CarePulse.CarePulse.model.Doctor;
import com.CarePulse.CarePulse.model.User;
import com.CarePulse.CarePulse.repository.AppointmentRepository;
import com.CarePulse.CarePulse.repository.DoctorRepository;
import com.CarePulse.CarePulse.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository apptRepo;
    @Autowired
    private DoctorRepository doctorRepo;
    @Autowired
    private UserRepository userRepo;

    @Transactional
    public AppointmentResponse book(BookingRequest req, String patientEmail) {
        Doctor doctor = doctorRepo.findById(req.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        User patient = userRepo.findByEmail(patientEmail)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Prevent double booking for same doctor + date + time
        boolean alreadyBooked = apptRepo.existsByDoctor_IdAndAppointmentDateAndAppointmentTimeAndStatusNot(
                doctor.getId(), req.getAppointmentDate(), req.getAppointmentTime(), AppointmentStatus.REJECTED);
        if (alreadyBooked) {
            throw new RuntimeException("This time slot is already booked");
        }

        Appointment appt = new Appointment();
        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setAppointmentDate(req.getAppointmentDate());
        appt.setAppointmentTime(req.getAppointmentTime());
        appt.setNotes(req.getNotes());
        appt.setStatus(AppointmentStatus.PENDING);

        return toResponse(apptRepo.save(appt));
    }

    public List<AppointmentResponse> getMyAppointments(String patientEmail) {
        return apptRepo.findByPatient_Email(patientEmail).stream().map(this::toResponse).toList();
    }

    public List<AppointmentResponse> getUpcomingForPatient(String patientEmail) {
        return apptRepo.findByPatient_EmailAndAppointmentDateGreaterThanEqualOrderByAppointmentDateAscAppointmentTimeAsc(
                        patientEmail, LocalDate.now())
                .stream().map(this::toResponse).toList();
    }

    public List<AppointmentResponse> getPastForPatient(String patientEmail) {
        return apptRepo.findByPatient_EmailAndAppointmentDateLessThanOrderByAppointmentDateDescAppointmentTimeDesc(
                        patientEmail, LocalDate.now())
                .stream().map(this::toResponse).toList();
    }

    public List<AppointmentResponse> getDoctorAppointments(String doctorEmail) {
        return apptRepo.findByDoctor_User_Email(doctorEmail).stream().map(this::toResponse).toList();
    }

    public List<AppointmentResponse> getPending(String doctorEmail) {
        return apptRepo.findByDoctor_User_EmailAndStatus(doctorEmail, AppointmentStatus.PENDING)
                .stream().map(this::toResponse).toList();
    }

    public List<AppointmentResponse> getToday(String doctorEmail) {
        return apptRepo.findByDoctor_User_EmailAndAppointmentDateAndStatus(
                        doctorEmail, LocalDate.now(), AppointmentStatus.APPROVED)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public AppointmentResponse updateStatus(Long apptId, String status, String doctorEmail) {
        Appointment appt = apptRepo.findById(apptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appt.getDoctor().getUser().getEmail().equals(doctorEmail)) {
            throw new AccessDeniedException("You can only update your own appointments");
        }

        appt.setStatus(AppointmentStatus.valueOf(status.toUpperCase()));
        return toResponse(apptRepo.save(appt));
    }

    @Transactional
    public AppointmentResponse cancel(Long apptId, String patientEmail) {
        Appointment appt = apptRepo.findById(apptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (!appt.getPatient().getEmail().equals(patientEmail)) {
            throw new AccessDeniedException("You can only cancel your own appointments");
        }
        if (appt.getStatus() != AppointmentStatus.PENDING && appt.getStatus() != AppointmentStatus.APPROVED) {
            throw new RuntimeException("Only pending/approved appointments can be cancelled");
        }

        appt.setStatus(AppointmentStatus.REJECTED);
        return toResponse(apptRepo.save(appt));
    }

    private AppointmentResponse toResponse(Appointment appt) {
        Doctor doctor = appt.getDoctor();
        return new AppointmentResponse(
                appt.getId(),
                appt.getPatient().getName(),
                appt.getPatient().getEmail(),
                doctor.getId(),
                doctor.getUser().getName(),
                doctor.getSpecialization().name(),
                appt.getAppointmentDate(),
                appt.getAppointmentTime(),
                appt.getStatus(),
                appt.getNotes(),
                appt.getCreatedAt()
        );
    }
}