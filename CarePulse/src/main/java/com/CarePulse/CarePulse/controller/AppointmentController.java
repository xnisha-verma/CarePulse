package com.CarePulse.CarePulse.controller;

import com.CarePulse.CarePulse.dto.BookingRequest;
import com.CarePulse.CarePulse.service.AppointmentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@Validated
public class AppointmentController {

    @Autowired
    private AppointmentService apptService;

    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> book(@Valid @RequestBody BookingRequest req,
                                  Authentication auth) {
        return ResponseEntity.ok(apptService.book(req, auth.getName()));
    }

    @GetMapping("/my")
    public ResponseEntity<?> myAppointments(Authentication auth) {
        return ResponseEntity.ok(apptService.getMyAppointments(auth.getName()));
    }

    @GetMapping("/my/upcoming")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> myUpcoming(Authentication auth) {
        return ResponseEntity.ok(apptService.getUpcomingForPatient(auth.getName()));
    }

    @GetMapping("/my/past")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> myPast(Authentication auth) {
        return ResponseEntity.ok(apptService.getPastForPatient(auth.getName()));
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> doctorAppointments(Authentication auth) {
        return ResponseEntity.ok(apptService.getDoctorAppointments(auth.getName()));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> pending(Authentication auth) {
        return ResponseEntity.ok(apptService.getPending(auth.getName()));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                          @RequestParam
                                          @Pattern(regexp = "APPROVED|REJECTED|COMPLETED",
                                                  message = "status must be APPROVED, REJECTED or COMPLETED")
                                          String status,
                                          Authentication auth) {
        return ResponseEntity.ok(apptService.updateStatus(id, status, auth.getName()));
    }

    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> cancel(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(apptService.cancel(id, auth.getName()));
    }

    @GetMapping("/today")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> today(Authentication auth) {
        return ResponseEntity.ok(apptService.getToday(auth.getName()));
    }

    @PutMapping("/{id}/prescription")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> addPrescription(@PathVariable Long id,
                                              @RequestBody java.util.Map<String, String> body,
                                              Authentication auth) {
        String prescription = body.get("prescription");
        if (prescription == null || prescription.isBlank()) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Prescription text is required"));
        }
        return ResponseEntity.ok(apptService.addPrescription(id, prescription, auth.getName()));
    }
}