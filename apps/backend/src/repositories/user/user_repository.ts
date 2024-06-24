import { Result } from '@badrap/result';
import client from '../prisma_client';
import { DbResult } from '../types';
import { DBError, NotFoundError } from '../errors';
import { User } from '@prisma/client';
import { UserCreate, UserUpdate } from './user_types';

async function create(user: UserCreate): DbResult<User> {
  try {
    const res = await client.user.create({
      data: user,
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function login(email: string, password: string): DbResult<boolean> {
  try {
    const res = await client.user.findFirst({
      where: { email, password },
    });
    if (res) return Result.ok(true);
    return Result.ok(false);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function readOne(id: string): DbResult<User> {
  try {
    const res = await client.user.findUnique({
      where: { id },
    });
    if (res) return Result.ok(res);
    return Result.err(new NotFoundError());
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function readAll(): DbResult<User[]> {
  try {
    const res = await client.user.findMany({});
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function update(user: UserUpdate, id: string): DbResult<User> {
  try {
    const res = await client.user.update({
      where: {
        id,
      },
      data: user,
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function remove(id: string): DbResult<User> {
  try {
    const res = await client.user.delete({
      where: { id },
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function findByEmail(email: string): DbResult<User> {
  try {
    const res = await client.user.findUnique({
      where: { email },
    });
    if (res) return Result.ok(res);
    return Result.err(new NotFoundError());
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function updatePassword(id: string, password: string): DbResult<User> {
  try {
    const res = await client.user.update({
      where: { id },
      data: { password },
    });
    return Result.ok(res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

async function emailExists(email: string): DbResult<boolean> {
  try {
    const res = await client.user.findUnique({
      where: { email },
    });
    return Result.ok(!!res);
  } catch (error) {
    console.error(error);
    return Result.err(new DBError());
  }
}

const userRepository = {
  create,
  login,
  readOne,
  readAll,
  update,
  remove,
  findByEmail,
  updatePassword,
  emailExists,
};

export default userRepository;
