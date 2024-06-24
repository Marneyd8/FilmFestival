import { Participant } from '@prisma/client';
import React, { FC } from 'react';
import { useParticipantsContext } from '../../context/ParticipantsContext';

type ParticipantTabProps = {
  participant: Participant;
};

const ParticipantTab: FC<ParticipantTabProps> = ({ participant }) => {
  const { participantsDispatch } = useParticipantsContext();

  const handleParticipantRemove = () => {
    participantsDispatch({
      type: 'REMOVE_PARTICIPANT',
      payload: participant.id,
    });
  };

  return (
    <div className="flex flex-row justify-between items-center border-2 rounded-md p-2 mt-2">
      <p>{participant.name}</p>
      <button
        onClick={handleParticipantRemove}
        className={`bg-rose-900 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-105 hover:cursor-pointer`}
      >
        <p className="">Remove participant</p>
      </button>
    </div>
  );
};

export default ParticipantTab;
