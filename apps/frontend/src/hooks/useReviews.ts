import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReviewApi from '../api/reviewApi';

export const useReviews = (filmId: number) => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => ReviewApi.getFilmReviews(filmId),
  });
};

export const useReviewCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewCreate'],
    mutationFn: ReviewApi.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

export const useReviewDelete = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewDelete'],
    mutationFn: () => ReviewApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
