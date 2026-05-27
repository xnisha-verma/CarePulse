package com.CarePulse.CarePulse.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private Specialization specialization;

    private String hospitalName;
    private Integer experience;
    private LocalTime availableStartTime;
    private LocalTime availableEndTime;
    private String profileImage;
}