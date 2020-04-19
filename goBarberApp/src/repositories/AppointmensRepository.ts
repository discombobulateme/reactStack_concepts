import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DTO Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[]; // private = not accessible outise the class

  constructor() {
    this.appointments = []; // = const appointments = Appointment[] = []
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment); // I get the new appointment and save

    return appointment;
  }
}

export default AppointmentsRepository;
