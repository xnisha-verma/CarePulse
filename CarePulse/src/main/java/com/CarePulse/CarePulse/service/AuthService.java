package com.CarePulse.CarePulse.service;

import com.CarePulse.CarePulse.dto.AuthRequest;
import com.CarePulse.CarePulse.dto.AuthResponse;
import com.CarePulse.CarePulse.model.Doctor;
import com.CarePulse.CarePulse.model.Specialization;
import com.CarePulse.CarePulse.model.User;
import com.CarePulse.CarePulse.repository.DoctorRepository;
import com.CarePulse.CarePulse.repository.UserRepository;
import com.CarePulse.CarePulse.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private DoctorRepository doctorRepo;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authManager;

    public AuthResponse register(AuthRequest req) {
        if (req.getName() == null || req.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name is required");
        }
        if (req.getEmail() == null || req.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }
        if (req.getPassword() == null || req.getPassword().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }
        if (req.getRole() == null || req.getRole().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role is required");
        }
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        }

        User.Role role;
        try {
            role = User.Role.valueOf(req.getRole().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role");
        }

        // Create user
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(role);
        userRepo.save(user);

        // If registering as DOCTOR, also create Doctor entity
        if (role == User.Role.DOCTOR) {
            Doctor doctor = new Doctor();
            doctor.setUser(user);
            doctor.setSpecialization(Specialization.DERMATOLOGIST);
            doctor.setExperience(1);
            doctor.setHospitalName("CarePulse Network");
            doctor.setAvailableStartTime(LocalTime.of(9, 0));
            doctor.setAvailableEndTime(LocalTime.of(17, 0));
            doctor.setProfileImage("https://ui-avatars.com/api/?name=" + req.getName().replace(" ", "+")
                    + "&size=200&background=0D8ABC&color=fff&rounded=true&bold=true");
            doctorRepo.save(doctor);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name(), user.getName(), user.getEmail());
    }

    public AuthResponse login(AuthRequest req) {
        if (req.getEmail() == null || req.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }
        if (req.getPassword() == null || req.getPassword().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User user = userRepo.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name(), user.getName(), user.getEmail());
    }
}
