import { FC } from 'react';
import { useCategory } from '../../hooks/useCategories';
import { FilmExtended } from '../../api/types';

type DescriptionProps = {
  film: FilmExtended;
};

const Description: FC<DescriptionProps> = ({ film }) => {
  const { data: categories } = useCategory(film.categoryID.toString());

  return (
    <div className="m-4 grid text-2xl bg-rose-900 text-white p-6 border border-rose-900 font-semibold rounded-xl">
      <p className="text-6xl">{film.name}</p>
      <p className="mb-12">{film.originalName}</p>
      <p>Category: {categories?.item.name}</p>
      <p>Length: {film.runTimeMinutes} minutes</p>
      <p>Relase Date: {film.publishedAt}</p>
      <p>
        Director:{' '}
        {film.participants
          .filter((participant) => participant.role === 'DIRECTOR')
          .map((participant) => participant.participant.name + ', ')}
      </p>
      <p>
        Writer:{' '}
        {film.participants
          .filter((participant) => participant.role === 'SCREENWRITER')
          .map((participant) => participant.participant.name + ', ')}
      </p>
      <p>
        Actors:{' '}
        {film.participants
          .filter((participant) => participant.role === 'ACTOR')
          .map((participant) => participant.participant.name + ', ')}
      </p>
    </div>
  );
};

export default Description;
