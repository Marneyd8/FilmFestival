import React, { ChangeEvent, FC, useState } from 'react';
import PlainButton from '../ui/PlainButton';
import { useReviewCreate } from '../../hooks/useReviews';
import { useLocalStorageUser } from '../../hooks/useAuth';

type CreateReviewFormProps = {
  filmId: number;
};

const CreateReviewForm: FC<CreateReviewFormProps> = ({ filmId }) => {
  const { mutateAsync: createReview } = useReviewCreate();
  const [user, _setUser] = useLocalStorageUser();
  const [reviewDesc, setReviewDesc] = useState<string>('');

  if (!user) {
    return <div>Prihlas se</div>;
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewDesc(event.target.value);
  };

  const handleSubmit = async () => {
    await createReview({
      movieId: filmId, // XDD
      description: reviewDesc,
      isSpoiler: false,
      stars: 5,
      userId: user.id,
    });
  };

  return (
    <div>
      <textarea
        placeholder="Write your review..."
        className="border border-rose-900 p-2 rounded-2xl w-full h-24 focus:outline-none focus:ring-2 focus:ring-rose-900"
        minLength={1}
        value={reviewDesc}
        onChange={handleChange}
      />
      <PlainButton
        title="Post Review"
        link={`/films/${filmId}`}
        color="rose-900"
        onClick={handleSubmit}
      ></PlainButton>
    </div>
  );
};

export default CreateReviewForm;
