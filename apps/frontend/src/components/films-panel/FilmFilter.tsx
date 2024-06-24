import React, { useState } from 'react';
import { Category } from '@prisma/client';

interface FilmFilterProps {
  categories: { items: Category[] };
  onFilterChange: (filter: {
    searchKey: string;
    votes: number;
    selectedCategoryIds: number[];
  }) => void;
}

const FilmFilter: React.FC<FilmFilterProps> = ({
  categories,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [votes, setVotes] = useState<number>(0);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = e.target.value;
    setSearchTerm(searchKey);
    onFilterChange({ searchKey, votes, selectedCategoryIds });
  };

  const handleVotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const votes = parseInt(e.target.value);
    setVotes(votes);
    onFilterChange({ searchKey: searchTerm, votes, selectedCategoryIds });
  };

  const handleCategoryChange = (categoryId: number) => {
    const updatedCategories = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];
    setSelectedCategoryIds(updatedCategories);
    onFilterChange({
      searchKey: searchTerm,
      votes,
      selectedCategoryIds: updatedCategories,
    });
  };

  const handleRemove = () => {
    setSearchTerm('');
    setVotes(0);
    setSelectedCategoryIds([]);
    onFilterChange({ searchKey: '', votes: 0, selectedCategoryIds: [] });
  };

  return (
    <div className="text-white text-lg font-semibold grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-rose-900 rounded-lg mb-8">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 rounded text-black"
        />
        <label htmlFor="votes" className="flex items-center">
          Votes:
          <input
            type="range"
            id="votes"
            min="0"
            max="100"
            value={votes}
            onChange={handleVotesChange}
            className="ml-2"
          />
          <span className="ml-2">{votes}</span>
        </label>
        <button
          onClick={handleRemove}
          className="bg-red-500 p-2 rounded text-white"
        >
          Remove
        </button>
      </div>

      <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        {categories.items.map((category) => (
          <label key={category.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategoryIds.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="mr-2"
            />
            {category.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilmFilter;
