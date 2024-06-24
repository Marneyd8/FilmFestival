import { FC } from 'react';
import { Film } from '@prisma/client';
import { FilmVoters, User } from '../../api/types';

type FilmCardOrderProps = {
  film: FilmVoters;
  orderNumber?: number;
};

const FilmCardOrder: FC<FilmCardOrderProps> = ({ film, orderNumber }) => {
  return (
    <div>
      <div className="flex flex-col items-center text-xl gap-4 p-4 border-2 md:w-96 bg-white rounded-lg border-rose-900">
        <div className="flex flex-row">
          <p className="text-8xl text-rose-900 font-semibold mr-6">
            {orderNumber}.
          </p>
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-semibold text-center">{film.name}</p>
            <p>{film.voters.length} votes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmCardOrder;
