import React, { FC } from 'react';
import SelectedSeat from './SelectedSeat';
import { useSeatReservation } from '../../context/SeatReservationContext';
import { useLocalStorageUser } from '../../hooks/useAuth';
import PlainButton from '../ui/PlainButton';

type SeatReservationPanelProps = {
  openCheckout: () => void;
};

const SeatReservationPanel: FC<SeatReservationPanelProps> = ({
  openCheckout,
}) => {
  const { seatReservationState } = useSeatReservation();
  const [user, _setUser] = useLocalStorageUser();

  const seatPrice = 20;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    openCheckout();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mx-8 gap-4">
      <div className="flex flex-col gap-2 items-baseline text-white font-semibold">
        <p className="text-4xl">Selected seats</p>
        <div className="grid grid-cols-2 gap-2">
          {seatReservationState.seats.map((seat) => (
            <SelectedSeat seat={seat} />
          ))}
        </div>
        <p className="text-4xl mb-16">
          Total: {seatReservationState.seats.length * seatPrice} $
        </p>
      </div>

      {user ? (
        <div className="flex flex-col gap-3">
          <button
            className="bg-rose-900 text-white px-40 py-2 rounded-md transform transition-all duration-300 hover:scale-105 hover:cursor-pointer max-h-10"
            onClick={handleSubmit}
          >
            Pay
          </button>
        </div>
      ) : (
        <p className="text-white text-2xl">You need to login first!</p>
      )}
    </div>
  );
};

export default SeatReservationPanel;
