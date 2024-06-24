import { Seat, User } from '@prisma/client';
import BaseApi from './baseApi';

const getAllSeats = async () => {
  return await BaseApi.getAll<Seat>('/seats');
};

const getSeatById = async (id: number) => {
  return await BaseApi.getSingle<Seat>(`/seats/${id}`);
};

const createSeat = async (seat: Partial<Seat>) => {
  return await BaseApi.postSingle<Seat>('/seats', seat);
};

const bookSeat = async (id: number, seat: Partial<Seat>) => {
  return await BaseApi.putSingle<Seat>(`/seats/${id}`, seat);
};

const bookMultipleSeats = async (userId: string, seatsId: number[]) => {
  console.log(userId, seatsId);

  return await BaseApi.postSingle<User>('/seats', {
    userId: userId,
    seatsId: seatsId,
  });
};

const unbookSeat = async (id: number) => {
  return await BaseApi.deleteSingle<Seat>(`/seats/${id}`);
};

const getUserSeats = async (userId: string) => {
  return await BaseApi.getAll<Seat>(`/seats/user/${userId}`);
};

const SeatApi = {
  getAllSeats,
  getSeatById,
  createSeat,
  bookSeat,
  unbookSeat,
  bookMultipleSeats,
  getUserSeats,
};

export default SeatApi;
