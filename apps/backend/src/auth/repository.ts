import { Result } from '@badrap/result';
import { redisClient } from '../redis_client';
import { User } from './types';
import { v4 } from 'uuid';
import { InternalError } from '../utils';
import argon2 from 'argon2';

const USER_KEY_PREFIX = 'user';
const USER_IDS_SET_KEY = 'userIds';
const EMAIL_TO_USER_ID_KEY = 'emailToUserId';

export const authRepository = {
  async create(user: Omit<User, 'id'>): Promise<Result<User>> {
    try {
      const newUserId = v4();
      const password = await argon2.hash(user.password);
      const newUser: User = { id: newUserId, ...user, password };

      await redisClient.set(
        `${USER_KEY_PREFIX}:${newUserId}`,
        JSON.stringify(newUser)
      );

      await redisClient.set(
        `${EMAIL_TO_USER_ID_KEY}:${user.email}`,
        newUserId.toString()
      );

      await redisClient.sAdd(USER_IDS_SET_KEY, newUserId.toString());

      return Result.ok(newUser);
    } catch (error) {
      console.error(error);
      return Result.err(new InternalError());
    }
  },

  async checkExists(email: string): Promise<Result<boolean>> {
    try {
      const userId = await redisClient.get(`${EMAIL_TO_USER_ID_KEY}:${email}`);
      return Result.ok(!!userId);
    } catch (error) {
      return Result.err(new InternalError());
    }
  },

  async getByEmail(email: string): Promise<Result<User | null>> {
    try {
      const userId = await redisClient.get(`${EMAIL_TO_USER_ID_KEY}:${email}`);
      if (!userId) return Result.ok(null);

      const userJson = await redisClient.get(`${USER_KEY_PREFIX}:${userId}`);
      if (!userJson) return Result.ok(null);

      const user = JSON.parse(userJson) as User;

      return Result.ok(user);
    } catch (error) {
      return Result.err(new InternalError());
    }
  },

  async getById(id: string): Promise<Result<User | null>> {
    try {
      const userJson = await redisClient.get(`${USER_KEY_PREFIX}:${id}`);
      if (!userJson) return Result.ok(null);

      const user = JSON.parse(userJson) as User;

      return Result.ok(user);
    } catch (error) {
      return Result.err(new InternalError());
    }
  },
};
