import { Review } from '@prisma/client';
import { FC } from 'react';
import { useUserById } from '../../hooks/useUser';

type FilmReviewProps = {
  review: Review;
};

const FilmReview: FC<FilmReviewProps> = ({ review }) => {
  const { data: user, isSuccess } = useUserById(review.userId);

  return (
    <div className="text-rose-900 font-semibold mb-4 bg-white p-6 rounded-lg shadow-md relative">
      {isSuccess && (
        <p className="text-black text-3xl mb-2">{user.item.email}</p>
      )}
      <p>{review.description}</p>
    </div>
  );
};

export default FilmReview;
