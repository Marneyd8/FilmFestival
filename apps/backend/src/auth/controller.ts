import { Request, Response } from 'express';
import { loginSchema, registerSchema } from './validation_schema';
import { fromZodError } from 'zod-validation-error';
import { handleRepositoryErrors } from '../utils';
import { DBError } from '../repositories/errors';
import { authRepository } from './repository';
import userRepository from '../repositories/user/user_repository';
import { UserBase } from '../repositories/user/user_types';
import argon2 from 'argon2';

const register = async (req: Request, res: Response) => {
  const validRequest = await registerSchema.safeParseAsync(req);

  if (!validRequest.success) {
    const error = fromZodError(validRequest.error);
    const errorResponse: Error = {
      name: 'ValidationError',
      message: error.message,
    };
    res.status(400).send(errorResponse);
    return;
  }

  const { name, email, password } = validRequest.data.body;

  const userExists = await authRepository.checkExists(email);

  if (userExists.isOk && userExists.value) {
    res.status(400).send({ message: 'User already exists' });
    return;
  }

  if (userExists.isErr && userExists.error instanceof DBError) {
    handleRepositoryErrors(userExists.error, res);
  }
  const redisUser = await makeUser({
    name: name,
    email: email,
    password: password,
    isAdmin: false,
  });
  if (redisUser.isOk) {
    res
      .status(200)
      .send({
        user: redisUser.value,
      })
      .end();
  }
  res.status(500).end();
};

export const makeUser = async (userBase: Omit<UserBase, 'id'>) => {
  const user = await authRepository.create({
    name: userBase.name,
    email: userBase.email,
    password: userBase.password,
    isAdmin: userBase.isAdmin,
  });

  if (user.isErr) {
    throw Error();
  }

  const redisUser = await authRepository.getByEmail(userBase.email);
  if (redisUser.isOk) {
    return await userRepository.create(redisUser.value);
  }
};

const login = async (req: Request, res: Response) => {
  const validRequest = await loginSchema.safeParseAsync(req);
  if (!validRequest.success) {
    const error = fromZodError(validRequest.error);
    const errorResponse: Error = {
      name: 'ValidationError',
      message: error.message,
    };
    res.status(400).send(errorResponse);
    return;
  }
  const { email, password } = validRequest.data.body;

  const redisUser = await authRepository.getByEmail(email);

  if (redisUser.isErr) {
    throw Error();
  }

  if (redisUser.isOk) {
    const userValue = redisUser.value;
    if (!(await argon2.verify(userValue.password, password))) {
      res.status(402).end();
      return;
    }

    res
      .status(200)
      .send({
        user: userValue,
      })
      .end();
  }

  res.status(404).end();
};

export const authController = {
  register,
  login,
};
