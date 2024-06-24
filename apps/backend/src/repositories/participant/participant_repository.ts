import { Result } from '@badrap/result';
import client from '../prisma_client';
import { DbResult } from '../types';
import { DBError, NotFoundError } from '../errors';
import { Participant } from '@prisma/client';

async function create(name: string): DbResult<Participant> {
  try {
    const res = await client.participant.create({
      data: { name },
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function readOne(id: number): DbResult<Participant> {
  try {
    const res = await client.participant.findUnique({
      where: { id },
    });
    if (res) return Result.ok(res);
    return Result.err(new NotFoundError());
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function readFromFilm(id: number): DbResult<Participant[]> {
  try {
    const res = await client.participant.findMany({
      where: { partipations: { some: { filmId: id } } },
    });
    if (res) return Result.ok(res);
    return Result.err(new NotFoundError());
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function readAll(): DbResult<Participant[]> {
  try {
    const res = await client.participant.findMany({});
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function update(name: string, id: number): DbResult<Participant> {
  try {
    const res = await client.participant.update({
      where: {
        id,
      },
      data: { name },
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function remove(id: number): DbResult<Participant> {
  try {
    const res = await client.participant.delete({
      where: { id },
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function searchByName(name: string): DbResult<Participant[]> {
  try {
    const res = await client.participant.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function getParticipantsWithFilms(): DbResult<Participant[]> {
  try {
    const res = await client.participant.findMany({
      include: {
        partipations: {
          include: {
            film: true,
          },
        },
      },
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}


const participantRepository = {
  create,
  readOne,
  readAll,
  readFromFilm,
  update,
  remove,
  searchByName,
  getParticipantsWithFilms,
};

export default participantRepository;
