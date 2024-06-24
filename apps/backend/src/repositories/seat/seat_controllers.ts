import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import seatRepository from './seat_repository';
import {
  bookSeatRequestSchema,
  getUserSeatsSchema,
  unbookSeatRequestSchema,
} from './seat_schemas';

const getAllSeats = async (_req: Request, res: Response) => {
  const seats = await seatRepository.read_all();
  if (seats.isErr) {
    handleRepositoryErrors(seats.error, res);
    return;
  }
  if (seats.isOk) res.status(200).send({ items: seats.value, message: 'OK' });
};

const bookSeat = async (req: Request, res: Response) => {
  const request = await parseRequest(bookSeatRequestSchema, req, res);
  if (request === null) return;

  const seat = await seatRepository.book(
    request.body.seatsId,
    request.body.userId
  );
  if (seat.isErr) {
    handleRepositoryErrors(seat.error, res);
    return;
  }
  if (seat.isOk)
    res.status(200).send({ item: seat.value, message: 'OK' });
};

const unbookSeat = async (req: Request, res: Response) => {
  const request = await parseRequest(unbookSeatRequestSchema, req, res);
  if (request === null) return;

  const updated = await seatRepository.unbook(request.params.id);
  if (updated.isErr) {
    handleRepositoryErrors(updated.error, res);
    return;
  }
  if (updated.isOk)
    res.status(200).send({ item: updated.value, message: 'OK' });
};

const getUserSeats = async (req: Request, res: Response) => {
  const request = await parseRequest(getUserSeatsSchema, req, res);
  if (request === null) return;

  const seats = await seatRepository.readUserSeats(request.params.userId);

  if (seats.isErr) {
    handleRepositoryErrors(seats.error, res);
    return;
  }
  if (seats.isOk) res.status(200).send({ items: seats.value, message: 'OK' });
};

export const seatsController = {
  bookSeat,
  unbookSeat,
  getAllSeats,
  getUserSeats,
};
