import { FC } from 'react';
import PlainButton from '../ui/PlainButton';
import { FilmExtended, FilmVoters } from '../../api/types';
import { useCategory } from '../../hooks/useCategories';

export type FilmCardProps = {
  film: FilmExtended;
};

const FilmCard: FC<FilmCardProps> = ({ film }) => {
  const { data: category } = useCategory(film.categoryID.toString());
  console.log(film);

  return (
    <div className="border-rose-900 border-4 bg-white p-6 rounded-lg text-center">
      <div className="flex flex-col h-full items-center">
        <div>
          <h2 className="text-2xl mb-5 mt-4">{film.name}</h2>
        </div>
        <div className="mt-auto">
          <h4>Category: {category?.item.name}</h4>
          <h4 className="mb-5">{film?.voters.length}</h4>
        </div>
        <PlainButton
          title="View more"
          color="rose-900"
          link={`/films/${film.id}`}
        ></PlainButton>
      </div>
    </div>
  );
};

export default FilmCard;
