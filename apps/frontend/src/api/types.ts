import { Review, Seat } from '@prisma/client';

export type ApiRespMulti<T> = {
  items: T[];
  message?: string;
};

export type ApiRespMultiPaginated<T> = ApiRespMulti<T> & {
  pagination: Pagination;
};

export type ApiRespSingle<T> = {
  item: T;
  message?: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
};

export type ReqPagination = {
  page: number;
};

export type UserBase = {
  email: string;
  name: string;
  hashedPassword: string;
  salt: string;
};

export type UserUpdate = Partial<UserBase>;

export type User = UserUpdate & {
  id: number;
};

export type UserExtended = UserBase & {
  reviews: Review[];
  votes: Film[];
  seats: Seat[];
};

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

export type Film = FilmBase & {
  id: number;
};

export type FilmExtended = Film & {
  voters: UserBase[];
  reviews: Review[];
  participants: FilmParticipant[];
};

export type FilmVoters = Film & {
  voters: UserBase[];
};

export type ReviewBase = {
  userId: string;
  movieId: number;
  stars: number;
  description: string;
  isSpoiler: boolean;
};

export type CategoryBase = {
  name: string;
};

export type CategoryUpdate = CategoryBase;

export type Category = CategoryUpdate & {
  id: number;
};

export type CategoryExtended = CategoryBase & {
  films: Film[];
};

export type Participant = {
  id: number;
  name: string;
  participations: FilmParticipant[];
};

export type ParticipantCreate = {
  name: string;
};

export type FilmParticipant = {
  participant: Participant;
  participantId: number;
  film: Film;
  filmId: number;
  role: Role;
};

export enum Role {
  DIRECTOR = 'DIRECTOR',
  SCREENWRITER = 'SCREENWRITER',
  ACTOR = 'ACTOR',
}

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
