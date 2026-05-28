package com.CarePulse.CarePulse.scheduler;

import com.CarePulse.CarePulse.model.Appointment;
import com.CarePulse.CarePulse.model.AppointmentStatus;
import com.CarePulse.CarePulse.repository.AppointmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ReminderScheduler {

    private static final Logger logger = LoggerFactory.getLogger(ReminderScheduler.class);

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Runs every day at 8:00 AM (server time).
    // For testing purposes, we can also use a fixedRate to trigger it more often if needed.
    @Scheduled(cron = "0 0 8 * * ?")
    public void sendUpcomingAppointmentReminders() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Appointment> upcomingAppointments = appointmentRepository.findByAppointmentDateAndStatus(tomorrow, AppointmentStatus.APPROVED);

        if (upcomingAppointments.isEmpty()) {
            logger.info("[Scheduler] No upcoming approved appointments for tomorrow ({}).", tomorrow);
            return;
        }

        logger.info("[Scheduler] Found {} upcoming appointments for tomorrow ({}). Starting email simulation...", upcomingAppointments.size(), tomorrow);

        for (Appointment appt : upcomingAppointments) {
            String patientEmail = appt.getPatient().getEmail();
            String patientName = appt.getPatient().getName();
            String doctorName = appt.getDoctor().getUser().getName();
            String time = appt.getAppointmentTime().toString();

            // Simulating an email being sent
            logger.info("==================================================");
            logger.info("📧 MOCK EMAIL SENT TO: {}", patientEmail);
            logger.info("Subject: Reminder: Upcoming Appointment with {}", doctorName);
            logger.info("Body:");
            logger.info("Dear {},", patientName);
            logger.info("This is a reminder that you have an upcoming appointment with {} tomorrow at {}.", doctorName, time);
            logger.info("Please make sure to arrive 10 minutes early. If you need to cancel, please log in to your CarePulse dashboard.");
            logger.info("Thank you,");
            logger.info("CarePulse Team");
            logger.info("==================================================");
        }

        logger.info("[Scheduler] Finished sending {} reminder emails.", upcomingAppointments.size());
    }
}
