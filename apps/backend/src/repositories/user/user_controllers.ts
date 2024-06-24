import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import userRepository from './user_repository';
import {
  createUserSchemaRequestSchema,
  deleteUserSchemaRequestSchema,
  loginSchemaRequestSchema,
  updateUserSchemaRequestSchema,
} from './user_schemas';
import { UserCreate } from './user_types';

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.readAll();
  if (users.isErr) {
    handleRepositoryErrors(users.error, res);
    return;
  }
  if (users.isOk) res.status(200).send({ items: users.value, message: 'OK' });
};

const loginUser = async (req: Request, res: Response) => {
  const request = await parseRequest(loginSchemaRequestSchema, req, res);
  if (request === null) return;

  const login = await userRepository.login(
    request.body.email,
    request.body.hashedPassword
  );
  if (login.isErr) {
    handleRepositoryErrors(login.error, res);
    return;
  }
  if (login.isOk) res.status(200).send({ item: login.value, message: 'OK' });
};

const readSingleUser = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteUserSchemaRequestSchema, req, res);
  if (request === null) return;

  const user = await userRepository.readOne(request.params.id);
  if (user.isErr) {
    handleRepositoryErrors(user.error, res);
    return;
  }
  if (user.isOk) res.status(200).send({ item: user.value, message: 'OK' });
};

const createUser = async (req: Request, res: Response) => {
  const request = await parseRequest(createUserSchemaRequestSchema, req, res);
  if (request === null) return;

  const user: UserCreate = {
    id: request.body.id,
    name: request.body.name,
    email: request.body.email,
    password: request.body.pasword,
    isAdmin: request.body.isAdmin,
  };

  const newUser = await userRepository.create(user);
  if (newUser.isErr) {
    handleRepositoryErrors(newUser.error, res);
    return;
  }
  if (newUser.isOk)
    res.status(201).send({ item: newUser.value, message: 'OK' });
};

const updateUser = async (req: Request, res: Response) => {
  const request = await parseRequest(updateUserSchemaRequestSchema, req, res);
  if (request === null) return;

  const updated = await userRepository.update(request.body, request.params.id);
  if (updated.isErr) {
    handleRepositoryErrors(updated.error, res);
    return;
  }
  if (updated.isOk)
    res.status(200).send({ item: updated.value, message: 'OK' });
};

const deleteUser = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteUserSchemaRequestSchema, req, res);
  if (request === null) return;

  const updated = await userRepository.remove(request.params.id);
  if (updated.isErr) {
    handleRepositoryErrors(updated.error, res);
    return;
  }
  if (updated.isOk)
    res.status(200).send({ item: updated.value, message: 'OK' });
};

export const usersController = {
  loginUser,
  updateUser,
  getAllUsers,
  createUser,
  deleteUser,
  readSingleUser,
};
