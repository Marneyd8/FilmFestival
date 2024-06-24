export type ReviewBase = {
  userId: string;
  movieId: number;
  stars: number;
  description: string;
  isSpoiler: boolean;
};

export type ReviewCreate = ReviewBase;
export type ReviewUpdate = Partial<ReviewBase>;

export type Review = ReviewCreate & {
  id: number;
};
