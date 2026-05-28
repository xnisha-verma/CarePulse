package com.CarePulse.CarePulse.controller;

import com.CarePulse.CarePulse.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public ResponseEntity<?> browseDoctors(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String specialization,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Page<?> result = doctorService.browseDoctors(search, specialization, page, size);
        return ResponseEntity.ok(
                Map.of(
                        "content", result.getContent(),
                        "page", result.getNumber(),
                        "size", result.getSize(),
                        "totalPages", result.getTotalPages(),
                        "totalElements", result.getTotalElements()
                )
        );
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorService.getDoctorById(doctorId));
    }

    @GetMapping("/my-profile")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> getMyProfile(org.springframework.security.core.Authentication auth) {
        return ResponseEntity.ok(doctorService.getMyProfile(auth.getName()));
    }

    @PutMapping("/profile")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> updateProfile(@RequestBody com.CarePulse.CarePulse.dto.DoctorProfileUpdateRequest req,
                                           org.springframework.security.core.Authentication auth) {
        return ResponseEntity.ok(doctorService.updateProfile(auth.getName(), req));
    }
}