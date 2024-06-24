import { useFilms } from '../../hooks/useFilms';
import FilmCardOrder from './FilmCardOrder';

const FilmsPanel = () => {
  const { data: films, isLoading, error } = useFilms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error loading films:', error);
    return <div>Error loading films.</div>;
  }
  return (
    <div className="flex flex-col justify-around md:flex-row">
      {films?.items
        .sort((a, b) => b.voters.length - a.voters.length)
        .slice(0, 3)
        .map((film, index) => (
          <FilmCardOrder orderNumber={index + 1} film={film} />
        ))}
    </div>
  );
};

export default FilmsPanel;
