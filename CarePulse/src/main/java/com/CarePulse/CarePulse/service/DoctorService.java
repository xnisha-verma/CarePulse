package com.CarePulse.CarePulse.service;

import com.CarePulse.CarePulse.dto.DoctorResponse;
import com.CarePulse.CarePulse.model.Doctor;
import com.CarePulse.CarePulse.model.Specialization;
import com.CarePulse.CarePulse.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepo;

    public Page<DoctorResponse> browseDoctors(String search, String specialization, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Doctor> doctors;

        boolean hasSearch = search != null && !search.isBlank();
        boolean hasSpec = specialization != null && !specialization.isBlank();

        if (hasSearch && hasSpec) {
            doctors = doctorRepo.findByUser_NameContainingIgnoreCaseAndSpecialization(
                    search.trim(), Specialization.valueOf(specialization.trim().toUpperCase()), pageable);
        } else if (hasSearch) {
            doctors = doctorRepo.findByUser_NameContainingIgnoreCase(search.trim(), pageable);
        } else if (hasSpec) {
            doctors = doctorRepo.findBySpecialization(
                    Specialization.valueOf(specialization.trim().toUpperCase()), pageable);
        } else {
            doctors = doctorRepo.findAll(pageable);
        }

        return doctors.map(this::toResponse);
    }

    public DoctorResponse getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return toResponse(doctor);
    }

    private DoctorResponse toResponse(Doctor doctor) {
        return new DoctorResponse(
                doctor.getId(),
                doctor.getUser().getName(),
                doctor.getUser().getEmail(),
                doctor.getSpecialization(),
                doctor.getExperience(),
                doctor.getHospitalName(),
                doctor.getProfileImage(),
                doctor.getAvailableStartTime(),
                doctor.getAvailableEndTime()
        );
    }
}
