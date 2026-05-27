package com.CarePulse.CarePulse.dto;

import com.CarePulse.CarePulse.model.Specialization;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorResponse {
    private Long id;
    private String fullName;
    private String email;
    private Specialization specialization;
    private Integer experience;
    private String hospitalName;
    private String profileImage;
    private LocalTime availableStartTime;
    private LocalTime availableEndTime;
}
