import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Description from '../components/description-panel/Description';
import ReviewSection from '../components/description-panel/ReviewSection';
import NavbarLine from '../components/ui/NavbarLine';
import PlainButton from '../components/ui/PlainButton';
import { useFilm, useFilmDownvote, useFilmVote } from '../hooks/useFilms';
import { getVideoId } from '../utils/getVideoId';
import { useLocalStorageUser } from '../hooks/useAuth';
import CreateReviewForm from '../components/description-panel/CreateReviewForm';

const FilmDescription = () => {
  const { id } = useParams();
  const filmId = id ? parseInt(id, 10) : -1;

  const [user, _setUser] = useLocalStorageUser();
  const { data: film, isLoading, error, isSuccess } = useFilm(filmId);

  const { mutateAsync: upvote } = useFilmVote(filmId);
  const { mutateAsync: downvote } = useFilmDownvote(filmId);

  const [isVoted, setIsVoted] = useState<boolean>();

  useEffect(() => {
    const voted = film?.item.voters.find(
      (voter) => voter.email === user?.email
    );
    setIsVoted(voted !== undefined);
  }, [film, user?.email]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error loading films:', error);
    return <div>Error loading films.</div>;
  }

  const youtubeVideoId = film?.item.intro ? getVideoId(film.item.intro) : null;

  return (
    <div className="bg-black">
      <NavbarLine />
      <div className="grid sd:grid-cols-1 md:grid-cols-2">
        {isSuccess && <Description film={film?.item} />}
        <div className="text-black rounded-lg border-rose-900 text-center overflow-hidden p-4">
          <iframe
            title="intro"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            allowFullScreen
            className="rounded-2xl"
          ></iframe>
        </div>
        {/*<RandomImage width={900} height={750} /> */}

        <div className="p-4">
          <CreateReviewForm filmId={filmId} />
        </div>
        <div className="p-4">
          <p className="text-white font-semibold pb-4">
            Total rating: {film?.item.voters.length}
          </p>
          {user && !isVoted && (
            <PlainButton
              title="Upvote"
              color="rose-900"
              link={`/films/${filmId}`}
              onClick={async () => await upvote(user.id)}
            />
          )}
          {user && isVoted && (
            <PlainButton
              title="Downvote"
              color="rose-900"
              link={`/films/${filmId}`}
              onClick={async () => await downvote(user.id)}
            />
          )}
        </div>
      </div>

      <NavbarLine />

      <div className="p-4">
        <ReviewSection filmId={filmId} />
      </div>
      <div className=" min-h-screen"></div>
    </div>
  );
};

export default FilmDescription;
