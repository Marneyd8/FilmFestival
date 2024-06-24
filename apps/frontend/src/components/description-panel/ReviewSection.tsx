import React, { FC } from 'react';
import FilmReview from './FilmReview';
import { useReviews } from '../../hooks/useReviews';

type ReviewsProps = {
  filmId: number;
};

const ReviewSection: FC<ReviewsProps> = ({ filmId }) => {
  const { data: reviews, isLoading } = useReviews(filmId);
  console.log(reviews);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-8">
      {reviews?.items ? (
        reviews.items.map((review) => (
          <FilmReview key={review.id} review={review}></FilmReview>
        ))
      ) : (
        <p className="text-white text-4xl mb-4">No reviews available</p>
      )}
    </div>
  );
};

export default ReviewSection;
