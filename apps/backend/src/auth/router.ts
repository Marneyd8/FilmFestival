import { Router } from 'express';
import { authController } from './controller';
import passport from 'passport';
import { User } from './types';

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', passport.authenticate('local'), authController.login);

authRouter.get('/logout', passport.session(), (req, res, next) => {
  req.logout(
    {
      keepSessionInfo: false,
    },
    (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).end();
    }
  );
});

passport.serializeUser((_user, cb) => {
  process.nextTick(() => {
    const user = _user as User;
    return cb(null, {
      id: user.id,
      name: user.name,
    });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user!);
  });
});
