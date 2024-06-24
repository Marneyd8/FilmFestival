import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type SeatAmountState = {
  rows: number;
  cols: number;
};

type SeatAmountAction =
  | { type: 'SET_ROWS'; payload: number }
  | { type: 'SET_COLS'; payload: number };

const SeatAmountContext = createContext<
  | {
      seatAmountState: SeatAmountState;
      seatAmountDispatch: React.Dispatch<SeatAmountAction>;
    }
  | undefined
>(undefined);

const seatAmountReducer = (
  state: SeatAmountState,
  action: SeatAmountAction
): SeatAmountState => {
  switch (action.type) {
    case 'SET_ROWS':
      return { rows: action.payload, cols: state.cols };
    case 'SET_COLS':
      return { rows: state.rows, cols: action.payload };
  }
};

const getInitialSeatAmountState = (): SeatAmountState => {
  const storedState = localStorage.getItem('seatAmountState');
  return storedState ? JSON.parse(storedState) : { rows: 10, cols: 15 };
};

export const SeatAmountProvider: FC<PropsWithChildren> = ({ children }) => {
  const [seatAmountState, seatAmountDispatch] = useReducer(
    seatAmountReducer,
    getInitialSeatAmountState()
  );

  useEffect(() => {
    localStorage.setItem('seatAmountState', JSON.stringify(seatAmountState));
  }, [seatAmountState]);

  return (
    <SeatAmountContext.Provider value={{ seatAmountState, seatAmountDispatch }}>
      {children}
    </SeatAmountContext.Provider>
  );
};

export const useSeatAmount = () => {
  const context = useContext(SeatAmountContext);
  if (!context) {
    throw new Error('useSeatAmount must be used within SeatAmountProvider!');
  }
  return context;
};
