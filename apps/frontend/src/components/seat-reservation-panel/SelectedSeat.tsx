import React, { FC } from 'react';
import { Seat } from '@prisma/client';

type SelectedSeatProps = {
  seat: Seat;
};

const SelectedSeat: FC<SelectedSeatProps> = ({ seat }) => {
  const { row, col } = seat;

  return (
    <div className="border-2 p-2 rounded-2xl text-center flex flex-row justify-between gap-2 items-center bg-rose-900">
      <p>
        row: {row + 1} seat: {col + 1}
      </p>
    </div>
  );
};

export default SelectedSeat;
