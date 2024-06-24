import { Seat } from '@prisma/client';
import React, { FC } from 'react';
import PlainButton from '../ui/PlainButton';
import { useUnbookSeat } from '../../hooks/useSeats';

type ReservedSeatProps = {
  seat: Seat;
};

const ReservedSeat: FC<ReservedSeatProps> = ({ seat }) => {
  const { mutateAsync: unbook } = useUnbookSeat(seat.id);

  const handleUnbook = async () => {
    await unbook();
  };

  return (
    <div className="flex flex-row justify-between items-center text-left border-2 rounded-md p-2 m-3">
      <p>
        Row: {seat.row + 1} Seat: {seat.col + 1}
      </p>
      <PlainButton
        color="rose-900"
        link="/user"
        title="Unbook"
        onClick={handleUnbook}
      />
    </div>
  );
};

export default ReservedSeat;
