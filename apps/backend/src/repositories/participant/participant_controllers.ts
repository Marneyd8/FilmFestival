import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import {
  createParticipantRequestSchema,
  deleteParticipantRequestSchema,
  getParticipantRequestSchema,
  updateParticipantRequestSchema,
} from './participant_schemas';
import participantRepository from './participant_repository';

const getSingleParticipant = async (req: Request, res: Response) => {
  const request = await parseRequest(getParticipantRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const participant = await participantRepository.readOne(id);
  if (participant.isErr) {
    handleRepositoryErrors(participant.error, res);
    return;
  }
  if (participant.isOk)
    res.status(200).send({ item: participant.value, message: 'OK' });
};

const getAllParticipants = async (_req: Request, res: Response) => {
  const participants = await participantRepository.readAll();
  if (participants.isErr) {
    handleRepositoryErrors(participants.error, res);
    return;
  }
  if (participants.isOk)
    res.status(200).send({ items: participants.value, message: 'OK' });
};

const createSingleParticipant = async (req: Request, res: Response) => {
  const request = await parseRequest(createParticipantRequestSchema, req, res);
  if (request === null) return;

  const name = request.body.name;

  const participant = await participantRepository.create(name);
  if (participant.isErr) {
    handleRepositoryErrors(participant.error, res);
    return;
  }
  if (participant.isOk)
    res.status(201).send({ item: participant.value, message: 'OK' });
};

const updateSingleParticipant = async (req: Request, res: Response) => {
  const request = await parseRequest(updateParticipantRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;
  const name = request.body.name;

  const updated = await participantRepository.update(name, id);
  if (updated.isErr) {
    handleRepositoryErrors(updated.error, res);
    return;
  }
  if (updated.isOk)
    res.status(200).send({ item: updated.value, message: 'OK' });
};

const deleteSingleParticipant = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteParticipantRequestSchema, req, res);
  if (request === null) return;

  const id = request.params.id;

  const confirmation = await participantRepository.remove(id);
  if (confirmation.isErr) {
    handleRepositoryErrors(confirmation.error, res);
    return;
  }

  res.status(200).send({ item: null, message: 'OK' });
};

export const participantController = {
  getAllParticipants,
  getSingleParticipant,
  updateSingleParticipant,
  deleteSingleParticipant,
  createSingleParticipant,
};
