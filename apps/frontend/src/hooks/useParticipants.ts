import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ParticipantApi from '../api/participantApi';

export const useParticipants = () => {
  return useQuery({
    queryKey: ['participants'],
    queryFn: ParticipantApi.getAllParticipants,
  });
};

export const useCreateParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['participantCreate'],
    mutationFn: ParticipantApi.createParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
    },
  });
};

export const useDeleteParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['participantDelete'],
    mutationFn: ParticipantApi.deleteParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
    },
  });
};
