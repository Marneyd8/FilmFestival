import { Category } from './repositories/category/category_types';
import { Film } from './repositories/film/film_types';
import {
  FilmParticipant,
  Participant,
} from './repositories/participant/participant_types';
import { Seat } from './repositories/seat/seat_types';
import { UserBase } from './repositories/user/user_types';

// export const reviews: Review[] = [
//   {
//     id: 1,
//     movieId: 1,
//     userId: 1,
//     description: 'Great movie! Really enjoyed the plot.',
//     stars: 5,
//     isSpoiler: false,
//   },
//   {
//     id: 2,
//     movieId: 1,
//     userId: 2,
//     description: 'The acting was superb!',
//     stars: 5,
//     isSpoiler: false,
//   },
//   {
//     id: 3,
//     movieId: 2,
//     userId: 3,
//     description: 'One of my favorite films of all time.',
//     stars: 5,
//     isSpoiler: false,
//   },
//   {
//     id: 4,
//     movieId: 2,
//     userId: 4,
//     description: 'Such a powerful ending.',
//     stars: 5,
//     isSpoiler: false,
//   },
//   {
//     id: 5,
//     movieId: 3,
//     userId: 5,
//     description: "Can't wait to watch it again!",
//     stars: 5,
//     isSpoiler: false,
//   },
// ];

export const seats: Seat[] = [];
for (let i = 0; i < 50; i++) {
  seats[i] = {
    id: i,
    row: Math.floor(i / 10),
    col: i % 10,
    reservationID: null,
  };
}

export const cateogiries: Category[] = [
  { id: 1, name: 'Sci-fi' },
  { id: 2, name: 'Fantasy' },
  { id: 3, name: 'Action' },
  { id: 4, name: 'Comedy' },
  { id: 5, name: 'Drama' },
];

export const films: Film[] = [
  {
    id: 1,
    name: 'Dune part 1',
    originalName: 'Dune part 1',
    intro: 'https://www.youtube.com/watch?v=n9xhJrPXop4',
    publishedAt: 2021,
    runTimeMinutes: 155,
    categoryID: 1,
  },
  {
    id: 2,
    name: 'Dune part 2',
    originalName: 'Dune part 2',
    intro: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    publishedAt: 2024,
    runTimeMinutes: 166,
    categoryID: 1,
  },
  {
    id: 3,
    name: 'Crank',
    originalName: 'Crank',
    intro: 'https://www.youtube.com/watch?v=8rvYrVTnSWw',
    publishedAt: 2005,
    runTimeMinutes: 100,
    categoryID: 3,
  },
  {
    id: 4,
    name: 'Van Helsing',
    originalName: 'Van Helsing',
    intro: 'https://www.youtube.com/watch?v=3fdRKme00uI',
    publishedAt: 2013,
    runTimeMinutes: 131,
    categoryID: 2,
  },
  {
    id: 5,
    name: 'Mad Max: Fury road',
    originalName: 'Mad Max: Fury road',
    intro: 'https://www.youtube.com/watch?v=hEJnMQG9ev8',
    publishedAt: 2018,
    runTimeMinutes: 120,
    categoryID: 3,
  },
  {
    id: 6,
    name: 'Podfuck',
    originalName: 'Snatch',
    intro: 'https://www.youtube.com/watch?v=9Jar2XkBboo',
    publishedAt: 2002,
    runTimeMinutes: 104,
    categoryID: 4,
  },
];

export const users: Omit<UserBase, 'id'>[] = [
  {
    email: 'peto.segan@email.com',
    name: 'Peto segan',
    password: 'sadsad',
    isAdmin: false,
  },
  {
    email: 'fero.mrkva@email.com',
    name: 'fero mrkva',
    password: 'sadasdsad',
    isAdmin: false,
  },
  {
    email: 'frajer55@email.com',
    name: 'Miso',
    password: 'scbfdad',
    isAdmin: false,
  },
  {
    email: 'stokar487@email.com',
    name: 'Adam',
    password: 'sc58xcd',
    isAdmin: false,
  },
  {
    email: 'hello.kitty@email.com',
    name: 'Nikol',
    password: 'scb4225d',
    isAdmin: false,
  },
  {
    email: 'admin@email.com',
    name: 'Admin',
    password: 'admin',
    isAdmin: true,
  },
];

export const participants: Participant[] = [
  {
    id: 1,
    name: 'Timothee Chalamet',
  },
  {
    id: 2,
    name: 'Zendaya',
  },
  {
    id: 3,
    name: 'Hugh Jackman',
  },
  {
    id: 4,
    name: 'Timothee Chalamet',
  },
  {
    id: 5,
    name: 'Tom Hardy',
  },
  {
    id: 6,
    name: 'Brad Pitt',
  },
  {
    id: 7,
    name: 'Jason Statham',
  },
  {
    id: 8,
    name: 'Denis Villeneuve',
  },
  {
    id: 9,
    name: 'Christopher Nolan',
  },
  {
    id: 10,
    name: 'Micheal Bay',
  },
];

export const filmParticipants: FilmParticipant[] = [
  { participantId: 1, filmId: 1, role: 'ACTOR' },
  { participantId: 1, filmId: 2, role: 'ACTOR' },
  { participantId: 2, filmId: 1, role: 'ACTOR' },
  { participantId: 2, filmId: 2, role: 'ACTOR' },
  { participantId: 8, filmId: 1, role: 'DIRECTOR' },
  { participantId: 8, filmId: 2, role: 'DIRECTOR' },
  { participantId: 6, filmId: 6, role: 'ACTOR' },
  { participantId: 7, filmId: 6, role: 'ACTOR' },
  { participantId: 7, filmId: 3, role: 'ACTOR' },
  { participantId: 7, filmId: 4, role: 'ACTOR' },
  { participantId: 7, filmId: 5, role: 'ACTOR' },
];
