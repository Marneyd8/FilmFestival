export type MockComment = {
  id: number;
  filmId: number;
  user: string;
  comment: string;
  date: string;
};

export const mockReviews: MockComment[] = [
  {
    id: 1,
    filmId: 1,
    user: 'Alice',
    comment: 'Great movie! Really enjoyed the plot.',
    date: '2023-06-15',
  },
  {
    id: 2,
    filmId: 1,
    user: 'Bob',
    comment: 'The acting was superb!',
    date: '2023-06-16',
  },
  {
    id: 3,
    filmId: 1,
    user: 'Carol',
    comment: 'One of my favorite films of all time.',
    date: '2023-06-17',
  },
  {
    id: 4,
    filmId: 1,
    user: 'David',
    comment: 'Such a powerful ending.',
    date: '2023-06-18',
  },
  {
    id: 5,
    filmId: 1,
    user: 'Eve',
    comment: 'Can\'t wait to watch it again!',
    date: '2023-06-19',
  },
];
