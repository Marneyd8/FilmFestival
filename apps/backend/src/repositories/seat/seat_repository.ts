import { Result } from '@badrap/result';
import client from '../prisma_client';
import { DbResult } from '../types';
import { DBError } from '../errors';
import { Seat, User } from '@prisma/client';

async function book(seatsId: number[], userId: string): DbResult<User> {
  try {
    const res = await client.user.update({
      where: { id: userId },
      data: {
        seats: {
          connect: seatsId.map((seatId) => {
            return { id: seatId };
          }),
        },
      },
    });
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

async function unbook(seatId: number): DbResult<Seat> {
  try {
    const res = await client.seat.update({
      where: { id: seatId },
      data: {
        reservationID: null,
      },
    });
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

async function readUserSeats(userId: string) {
  try {
    const res = await client.seat.findMany({
      where: { reservationID: userId },
    });
    return Result.ok(res);
  } catch (error) {
    return Result.err(new DBError());
  }
}

async function readAll(): DbResult<Seat[]> {
  try {
    const res = await client.seat.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return Result.ok(res);
  } catch {
    return Result.err(new DBError());
  }
}

const seatRepository = {
  book,
  unbook,
  read_all: readAll,
  readUserSeats,
};
export default seatRepository;
