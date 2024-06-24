import { Router } from 'express';
import { categoriesController } from './repositories/category/category_controllers';
import { usersController } from './repositories/user/user_controllers';
import { filmsController } from './repositories/film/film_controllers';
import { reviewController } from './repositories/review/review_controllers';
import { seatsController } from './repositories/seat/seat_controllers';
import { participantController } from './repositories/participant/participant_controllers';

export const category_router = Router();
export const film_router = Router();
export const participant_router = Router();
export const review_router = Router();
export const seat_router = Router();
export const user_router = Router();

user_router.get('/', usersController.getAllUsers);
user_router.get('/:id', usersController.readSingleUser);
user_router.get('/login', usersController.loginUser);
user_router.post('/', usersController.createUser);
user_router.put('/:id', usersController.updateUser);
user_router.delete('/:id', usersController.deleteUser);

film_router.get('/', filmsController.getAllFilms);
film_router.get('/:id', filmsController.getSingleFilm);
film_router.post('/', filmsController.createSingleFilm);
film_router.put('/:id', filmsController.updateSingleFilm);
film_router.delete('/:id', filmsController.deleteSingleFilm);
film_router.post('/participants', filmsController.addFilmParticipant);
film_router.delete('/participants', filmsController.removeFilmParticipant);
film_router.post('/vote', filmsController.upvote);
film_router.post('/downvote', filmsController.downvote);

review_router.get('/', reviewController.getAllReviews);
review_router.get('/:id', reviewController.getSingleReview);
review_router.post('/', reviewController.createSingleReview);
review_router.put('/:id', reviewController.updateSingleReview);
review_router.delete('/:id', reviewController.deleteSingleReview);
review_router.get('/film/:id', reviewController.getAllReviewsFromFilm);

category_router.get('/', categoriesController.getAllCategories);
category_router.get('/:id', categoriesController.getSingleCategory);
category_router.post('/', categoriesController.createSingleCategory);
category_router.put('/:id', categoriesController.updateSingleCategory);
category_router.delete('/:id', categoriesController.deleteSingleCategory);

seat_router.get('/', seatsController.getAllSeats);
seat_router.post('/', seatsController.bookSeat);
seat_router.delete('/:id', seatsController.unbookSeat);
seat_router.get('/user/:userId', seatsController.getUserSeats);

participant_router.get('/', participantController.getAllParticipants);
participant_router.get('/:id', participantController.getSingleParticipant);
participant_router.post('/', participantController.createSingleParticipant);
participant_router.put('/:id', participantController.updateSingleParticipant);
participant_router.delete(
  '/:id',
  participantController.deleteSingleParticipant
);
