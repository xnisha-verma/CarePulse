package com.CarePulse.CarePulse.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    @NotNull(message = "doctorId is required")
    private Long doctorId;

    @NotNull(message = "appointmentDate is required")
    private LocalDate appointmentDate;

    @NotNull(message = "appointmentTime is required")
    private LocalTime appointmentTime;

    private String notes;
    private String medicalHistoryLink;
}