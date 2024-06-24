import { Strategy as LocalStrategy } from 'passport-local';
import { authRepository } from './repository';
import argon2 from 'argon2';

export const passportStrategy = () =>
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await authRepository.getByEmail(email);

      if (user.isErr) {
        return done(user.error);
      }
      if (!user) {
        return done(null, false, { message: 'User not found by email!' });
      }
      const unwrappedUser = user.unwrap();
      const isPasswordCorrect = await argon2.verify(
        unwrappedUser.password,
        password
      );

      if (!isPasswordCorrect) {
        return done(null, false, { message: 'Incorrect password!' });
      }

      return done(null, unwrappedUser);
    }
  );
