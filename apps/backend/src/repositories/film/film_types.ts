import { FilmParticipant } from '../participant/participant_types';
import { Review } from '../review/review_types';
import { User } from '../user/user_types';

export type FilmBase = {
  name: string;
  originalName: string;
  intro: string;
  publishedAt: number;
  runTimeMinutes: number;
  categoryID: number;
};

export type FilmCreate = FilmBase;
export type FilmUpdate = Partial<FilmBase>;

export type Film = FilmCreate & {
  id: number;
};

export type FilmExtended = Film & {
  voters: User[];
  reviews: Review[];
  participants: FilmParticipant[];
};

export type Role = 'DIRECTOR' | 'SCREENWRITER' | 'ACTOR';
