import React, { useState } from 'react';
import { useSeatAmount } from '../../context/SeatAmountContext';

const SeatsController = () => {
  const { seatAmountState, seatAmountDispatch } = useSeatAmount();

  const [rows, setRows] = useState<number>(seatAmountState.rows);
  const [cols, setCols] = useState<number>(seatAmountState.cols);

  const handleSet = () => {
    seatAmountDispatch({
      type: 'SET_ROWS',
      payload: rows,
    });

    seatAmountDispatch({
      type: 'SET_COLS',
      payload: cols,
    });
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(parseInt(event.target.value, 10));
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCols(parseInt(event.target.value, 10));
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <label htmlFor="rows">Rows</label>
      <input
        id="rows"
        className="w-full p-2 border border-gray-300 rounded mb-3"
        placeholder="Number of rows"
        type="number"
        min={0}
        value={rows}
        onChange={handleRowsChange}
      />
      <label htmlFor="cols">Columns</label>
      <input
        id="cols"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Number of columns"
        type="number"
        min={0}
        value={cols}
        onChange={handleColsChange}
      />
      <button
        className="mt-4 bg-rose-900 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-105 hover:cursor-pointer"
        onClick={handleSet}
      >
        Set
      </button>
    </div>
  );
};

export default SeatsController;
