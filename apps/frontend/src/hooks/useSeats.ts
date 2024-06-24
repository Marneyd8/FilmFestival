import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SeatApi from '../api/seatApi';
import { Seat } from '@prisma/client';

export const useSeats = () => {
  return useQuery({
    queryKey: ['seats'],
    queryFn: () => SeatApi.getAllSeats(),
  });
};

export const useBookSeat = (seatId: number) => {
  return useMutation({
    mutationKey: ['seat'],
    mutationFn: (payload: Seat) => SeatApi.bookSeat(seatId, payload),
  });
};

export const useUnbookSeat = (seatId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reserved-seats'],
    mutationFn: () => SeatApi.unbookSeat(seatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reserved-seats'] });
    },
  });
};

export const useBookMultipleSeats = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['bookSeats'],
    mutationFn: (seatsId: number[]) =>
      SeatApi.bookMultipleSeats(userId, seatsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seats', 'seat'] });
    },
  });
};

export const useUserSeats = (userId: string) => {
  return useQuery({
    queryKey: ['reserved-seats'],
    queryFn: () => SeatApi.getUserSeats(userId),
  });
};
