import { FC } from 'react';
import FilmCard from './FilmCard';
import { FilmVoters } from '../../api/types';

type FilmRowProps = {
  films: FilmVoters[];
};

const FilmRow: FC<FilmRowProps> = ({ films }) => {
  return (
    <div className="text-rose-900 font-semibold grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {films.map((film) => (
        <FilmCard
          film={{
            id: film.id,
            categoryID: film.categoryID,
            intro: film.intro,
            name: film.name,
            originalName: film.originalName,
            participants: [],
            publishedAt: film.publishedAt,
            reviews: [],
            runTimeMinutes: film.runTimeMinutes,
            voters: film.voters,
          }}
        ></FilmCard>
      ))}
    </div>
  );
};

export default FilmRow;
