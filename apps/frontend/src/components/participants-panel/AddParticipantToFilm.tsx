import { Role } from '../../api/types';
import { useAddParticipants, useFilms } from '../../hooks/useFilms';
import { useParticipantsContext } from '../../context/ParticipantsContext';
import { useState } from 'react';
import ParticipantTab from './ParticipantTab';
import PlainButton from '../ui/PlainButton';

const AddParticipantToFilm = () => {
  const { data: films, isSuccess: filmsSuccess } = useFilms();
  const { participantsState } = useParticipantsContext();

  const [selectedFilm, setSelectedFilm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');

  const { mutateAsync } = useAddParticipants();

  const handleAddParticipants = async () => {
    if (selectedFilm && selectedRole) {
      await mutateAsync({
        filmId: parseInt(selectedFilm, 10),
        role: selectedRole,
        participantIds: participantsState.participants.map((p) => p.id),
      });
    }
  };

  return (
    <div className="bg-white rounded-md p-4">
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={selectedFilm}
        onChange={(e) => setSelectedFilm(e.target.value)}
      >
        <option value="">Select film</option>
        {filmsSuccess ? (
          films.items.map((film) => (
            <option key={film.id} value={film.id}>
              {film.name}
            </option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </select>

      <select
        className="w-full p-2 mt-2 border border-gray-300 rounded"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as Role)}
      >
        <option value="">Select role</option>
        {Object.values(Role).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <div>
        <h1 className="mt-4 text-center text-xl">Added participants</h1>
        {participantsState.participants.map((participant) => (
          <ParticipantTab key={participant.id} participant={participant} />
        ))}
      </div>

      <div className="mt-4">
        <PlainButton
          color="green-500"
          link="/admin/participants"
          title="Add participants"
          onClick={handleAddParticipants}
        />
      </div>
    </div>
  );
};

export default AddParticipantToFilm;
