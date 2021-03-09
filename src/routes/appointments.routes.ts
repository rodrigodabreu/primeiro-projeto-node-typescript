import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRepository = new AppointmentRepository();
const appointmentsRouter = Router();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date)); // Aqui está sendo convertido para uma Date do Javascript
    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );
    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointmnet is already booked' });
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);
    return response.json(appointment);
});

export default appointmentsRouter;
