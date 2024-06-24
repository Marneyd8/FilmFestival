import BaseApi from './baseApi';
import { Participant, ParticipantCreate } from './types';

const getAllParticipants = async () => {
  return await BaseApi.getAll<Participant>('/participants');
};

const getParticipantById = async (id: number) => {
  return await BaseApi.getSingle<Participant>(`/participants/${id}`);
};

const createParticipant = async (participant: ParticipantCreate) => {
  return await BaseApi.postSingle<Participant>('/participants', participant);
};

const updateParticipant = async (
  id: number,
  participant: Partial<Participant>
) => {
  return await BaseApi.putSingle<Participant>(
    `/participants/${id}`,
    participant
  );
};

const deleteParticipant = async (id: number) => {
  return await BaseApi.deleteSingle<Participant>(`/participants/${id}`);
};

const ParticipantApi = {
  getAllParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
};

export default ParticipantApi;
