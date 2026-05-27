package com.CarePulse.CarePulse.config;

import com.CarePulse.CarePulse.model.*;
import com.CarePulse.CarePulse.repository.AppointmentRepository;
import com.CarePulse.CarePulse.repository.DoctorRepository;
import com.CarePulse.CarePulse.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final Random random = new Random();

    public DataSeeder(UserRepository userRepository,
                      DoctorRepository doctorRepository,
                      AppointmentRepository appointmentRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedDoctors();
        seedPatients();
        seedAppointments();
    }

    // ── DOCTOR SEEDING ──────────────────────────────────────────

    private void seedDoctors() {
        if (doctorRepository.count() > 0) return;

        String[][] doctorData = {
            {"Dr. Arjun Sharma",     "arjun.sharma@carepulse.in",     "CARDIOLOGIST",   "Apollo Hospital Delhi",        "18", "9",  "17"},
            {"Dr. Priya Mehta",      "priya.mehta@carepulse.in",      "DENTIST",        "Fortis Hospital Mumbai",       "10", "9",  "18"},
            {"Dr. Ravi Kumar",       "ravi.kumar@carepulse.in",       "NEUROLOGIST",    "AIIMS New Delhi",              "22", "8",  "16"},
            {"Dr. Sunita Rao",       "sunita.rao@carepulse.in",       "DERMATOLOGIST",  "Max Healthcare Gurugram",      "12", "10", "18"},
            {"Dr. Vikram Nair",      "vikram.nair@carepulse.in",      "PEDIATRICIAN",   "Medanta The Medicity",         "15", "9",  "17"},
            {"Dr. Ananya Iyer",      "ananya.iyer@carepulse.in",      "ORTHOPEDIC",     "Apollo Hospital Chennai",      "8",  "10", "18"},
            {"Dr. Sanjay Gupta",     "sanjay.gupta@carepulse.in",     "CARDIOLOGIST",   "Fortis Hospital Bangalore",    "25", "8",  "15"},
            {"Dr. Deepika Reddy",    "deepika.reddy@carepulse.in",    "DENTIST",        "AIIMS Hyderabad",              "6",  "11", "19"},
            {"Dr. Rohit Singh",      "rohit.singh@carepulse.in",      "NEUROLOGIST",    "Max Healthcare Saket",         "14", "9",  "17"},
            {"Dr. Kavitha Pillai",   "kavitha.pillai@carepulse.in",   "DERMATOLOGIST",  "Medanta Lucknow",              "11", "10", "18"},
        };

        List<Doctor> doctors = new ArrayList<>();
        for (String[] d : doctorData) {
            User user = createUser(d[0], d[1], "Doctor@123", User.Role.DOCTOR);
            Doctor doctor = new Doctor();
            doctor.setUser(user);
            doctor.setSpecialization(Specialization.valueOf(d[2]));
            doctor.setHospitalName(d[3]);
            doctor.setExperience(Integer.parseInt(d[4]));
            doctor.setAvailableStartTime(LocalTime.of(Integer.parseInt(d[5]), 0));
            doctor.setAvailableEndTime(LocalTime.of(Integer.parseInt(d[6]), 0));
            doctor.setProfileImage("https://ui-avatars.com/api/?name=" + d[0].replace(" ", "+")
                    + "&size=200&background=0D8ABC&color=fff&rounded=true&bold=true");
            doctors.add(doctor);
        }

        doctorRepository.saveAll(doctors);
        System.out.println("[DataSeeder] ✅ Seeded " + doctors.size() + " doctors.");
    }

    // ── PATIENT SEEDING ─────────────────────────────────────────

    private void seedPatients() {
        // Check if patients already exist (doctors already added users, so filter by role)
        long patientCount = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.PATIENT).count();
        if (patientCount > 0) return;

        String[][] patientData = {
            {"Rahul Sharma",    "rahul.sharma@gmail.com"},
            {"Priyanka Singh",  "priyanka.singh@gmail.com"},
            {"Amit Kumar",      "amit.kumar@gmail.com"},
            {"Sneha Reddy",     "sneha.reddy@gmail.com"},
            {"Mohit Verma",     "mohit.verma@gmail.com"},
        };

        for (String[] p : patientData) {
            createUser(p[0], p[1], "Patient@123", User.Role.PATIENT);
        }

        System.out.println("[DataSeeder] ✅ Seeded " + patientData.length + " patients.");
    }

    // ── APPOINTMENT SEEDING ─────────────────────────────────────

    private void seedAppointments() {
        if (appointmentRepository.count() > 0) return;

        List<User> patients = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.PATIENT).toList();
        List<Doctor> doctors = doctorRepository.findAll();

        if (patients.isEmpty() || doctors.isEmpty()) {
            System.out.println("[DataSeeder] ⚠️ Skipping appointments — no patients or doctors.");
            return;
        }

        AppointmentStatus[] statuses = AppointmentStatus.values();
        String[] notes = {
            "Chest pain since last week.",
            "Follow-up for dental treatment.",
            "Recurring headaches for 3 days.",
            "Skin rash after new medication.",
            "Child has fever and cold.",
            "Knee pain after sports injury.",
            "Annual cardiology check-up.",
            "Migraine management consultation.",
            "Eczema flare-up treatment.",
            "Post-surgery follow-up."
        };

        List<Appointment> appointments = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            User patient = patients.get(i % patients.size());
            Doctor doctor = doctors.get(i % doctors.size());

            Appointment appt = new Appointment();
            appt.setPatient(patient);
            appt.setDoctor(doctor);
            appt.setAppointmentDate(randomFutureDate(i));
            appt.setAppointmentTime(randomTime(doctor));
            appt.setStatus(statuses[i % statuses.length]);
            appt.setNotes(notes[i % notes.length]);
            appointments.add(appt);
        }

        appointmentRepository.saveAll(appointments);
        System.out.println("[DataSeeder] ✅ Seeded " + appointments.size() + " appointments.");
    }

    // ── HELPER METHODS ──────────────────────────────────────────

    private User createUser(String name, String email, String password, User.Role role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }

    private LocalDate randomFutureDate(int index) {
        return LocalDate.now().plusDays((index * 3) % 30 + 1);
    }

    private LocalTime randomTime(Doctor doctor) {
        int startHour = doctor.getAvailableStartTime().getHour();
        int endHour = doctor.getAvailableEndTime().getHour();
        int hour = startHour + random.nextInt(Math.max(endHour - startHour, 1));
        return LocalTime.of(hour, 0);
    }
}
