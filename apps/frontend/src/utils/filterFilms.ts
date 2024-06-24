import { Film, FilmVoters } from '../api/types';

export const filterFilms = (
  films: FilmVoters[],
  searchKey: string,
  votes: number,
  selectedCategoryIds: number[]
): FilmVoters[] => {
  let filtered = films;

  if (searchKey) {
    filtered = filtered.filter((film) =>
      film.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  if (votes > 0) {
    filtered = filtered.filter((film) => film.voters.length >= votes);
  }

  if (selectedCategoryIds.length > 0) {
    filtered = filtered.filter((film) =>
      selectedCategoryIds.some((categoryId) => film.categoryID === categoryId)
    );
  }

  return filtered;
};
