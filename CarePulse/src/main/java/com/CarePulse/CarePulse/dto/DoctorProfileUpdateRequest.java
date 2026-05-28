package com.CarePulse.CarePulse.dto;

import com.CarePulse.CarePulse.model.Specialization;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;

@Data
@NoArgsConstructor
public class DoctorProfileUpdateRequest {
    private String hospitalName;
    private Integer experience;
    private LocalTime availableStartTime;
    private LocalTime availableEndTime;
    private Specialization specialization;
}
