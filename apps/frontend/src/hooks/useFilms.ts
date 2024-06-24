import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FilmApi from '../api/filmApi';
import { Role } from '../api/types';

export const useFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: () => FilmApi.getAllFilms(),
  });
};

export const useFilm = (id: number) => {
  return useQuery({
    queryKey: ['film', id],
    queryFn: () => FilmApi.getFilmById(id),
  });
};

export const useFilmDelete = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => FilmApi.deleteFilm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['films'] });
    },
  });
};

export const useFilmCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['film'],
    mutationFn: FilmApi.createFilm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['films'] });
    },
  });
};

export const useFilmVote = (filmId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['upvote'],
    mutationFn: (userId: string) => FilmApi.upvote(filmId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['films'] });
      queryClient.invalidateQueries({ queryKey: ['film', filmId] });
    },
  });
};

export const useFilmDownvote = (filmId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['downvote'],
    mutationFn: (userId: string) => FilmApi.downvote(filmId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['films'] });
      queryClient.invalidateQueries({ queryKey: ['film', filmId] });
    },
  });
};

export const useAddParticipants = () => {
  return useMutation({
    mutationKey: ['addParticipants'],
    mutationFn: (vars: {
      filmId: number;
      participantIds: number[];
      role: Role;
    }) => FilmApi.addParticipants(vars.filmId, vars.participantIds, vars.role),
  });
};
