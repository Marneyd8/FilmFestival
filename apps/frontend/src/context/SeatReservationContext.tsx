import { Seat } from '@prisma/client';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

type SeatReservationState = {
  seats: Seat[];
};

type SeatReservationAction =
  | { type: 'BOOK_SEAT'; payload: Seat }
  | { type: 'UNBOOK_SEAT'; payload: number };

const SeatReservationContext = createContext<
  | {
      seatReservationState: SeatReservationState;
      seatReservationDispatch: React.Dispatch<SeatReservationAction>;
    }
  | undefined
>(undefined);

const seatReservationReducer = (
  state: SeatReservationState,
  action: SeatReservationAction
): SeatReservationState => {
  switch (action.type) {
    case 'BOOK_SEAT':
      return { seats: [...state.seats, action.payload] };
    case 'UNBOOK_SEAT':
      return {
        seats: state.seats.filter((seat) => seat.id !== action.payload),
      };
  }
  return state;
};

export const SeatReservationProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [seatReservationState, seatReservationDispatch] = useReducer(
    seatReservationReducer,
    { seats: [] }
  );

  return (
    <SeatReservationContext.Provider
      value={{ seatReservationState, seatReservationDispatch }}
    >
      {children}
    </SeatReservationContext.Provider>
  );
};

export const useSeatReservation = () => {
  const context = useContext(SeatReservationContext);
  if (!context) {
    throw new Error(
      'useSeatReservation must be used within SeatReservationProvider!'
    );
  }
  return context;
};
