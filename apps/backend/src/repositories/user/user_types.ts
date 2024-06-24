import { Film } from '../film/film_types';
import { Review } from '../review/review_types';
import { Seat } from '../seat/seat_types';

export type UserBase = {
  id: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
};

export type UserCreate = UserBase;
export type UserUpdate = Partial<UserBase>;

export type User = UserCreate & {
  id: string;
};

export type UserExtended = User & {
  votes: Film[];
  reviews: Review[];
  seats: Seat[];
};
