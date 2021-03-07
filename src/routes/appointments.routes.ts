import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appoitmentsRouter = Router();

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

const appointments: Appointment[] = []; // Declarando que o conteúdo desse array é um Appointment

appoitmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date)); // Aqui está sendo convertido para uma Date do Javascript

    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(parsedDate, appointment.date),
    );
    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointmnet is already booked' });
    }

    const appointment = {
        id: uuid(),
        provider,
        date: parsedDate,
    };
    appointments.push(appointment);
    return response.json(appointments);
});

export default appoitmentsRouter;
