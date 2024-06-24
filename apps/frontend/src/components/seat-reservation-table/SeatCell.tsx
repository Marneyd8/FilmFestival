import { FC, useState } from 'react';
import { useSeatReservation } from '../../context/SeatReservationContext';
import { Seat } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

type SeatCellProps = {
  seat: Seat;
};

const SeatCell: FC<SeatCellProps> = ({ seat }) => {
  const { id } = seat;

  const [selected, setSelected] = useState(false);

  const { seatReservationDispatch } = useSeatReservation();

  const handleClick = () => {
    if (selected) {
      seatReservationDispatch({ type: 'UNBOOK_SEAT', payload: id });
    } else {
      seatReservationDispatch({ type: 'BOOK_SEAT', payload: seat });
    }
    setSelected(!selected);
  };
  console.log(seat.reservationID);

  if (seat.reservationID) {
    return (
      <div className="bg-black text-white relative flex flex-col items-center justify-center h-8 w-10 lg:h-14 lg:w-20 rounded-md">
        Taken
      </div>
    );
  } else {
    return (
      <button
        className={`relative flex flex-col items-center justify-center border-2 h-8 w-10 lg:h-14 lg:w-20 cursor-pointer rounded-md ${
          selected
            ? 'bg-white'
            : 'bg-rose-900 text-white border-white transform transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-white hover:text-rose-900'
        } `}
        onClick={handleClick}
        disabled={seat.reservationID != null}
      >
        {selected && (
          <FontAwesomeIcon
            className="absolute top-1 right-1 w-3 h-3 lg:w-5 lg:h-5"
            icon={faRemove}
            size="xl"
          />
        )}
        <p>{id}</p>
      </button>
    );
  }
};

export default SeatCell;
