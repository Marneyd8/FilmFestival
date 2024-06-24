import { Participant } from '@prisma/client';
import React, { FC } from 'react';
import { useDeleteParticipant } from '../../hooks/useParticipants';
import PlainButton from '../ui/PlainButton';
import { useParticipantsContext } from '../../context/ParticipantsContext';

type ParticipantCardProps = {
  participant: Participant;
};

const ParticipantCard: FC<ParticipantCardProps> = ({ participant }) => {
  const { mutateAsync: deleteParticipant } = useDeleteParticipant();
  const { participantsDispatch } = useParticipantsContext();

  const handleAddParticipant = () => {
    participantsDispatch({ type: 'ADD_PARTICIPANT', payload: participant });
  };

  return (
    <div className="flex flex-row justify-between bg-white rounded-md mb-3 p-4">
      <p>{participant.name}</p>
      <div className="flex flex-row gap-2">
        <PlainButton
          color="rose-900"
          link="/admin/participants"
          title="Remove"
          onClick={async () => await deleteParticipant(participant.id)}
        />
        <button
          onClick={handleAddParticipant}
          className={`bg-green-500 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-105 hover:cursor-pointer`}
        >
          <p className="">Add participant</p>
        </button>
      </div>
    </div>
  );
};

export default ParticipantCard;
