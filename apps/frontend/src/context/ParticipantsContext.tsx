import { Participant } from '@prisma/client';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

type ParticipantsState = {
  participants: Participant[];
};

type ParticipantsAction =
  | { type: 'ADD_PARTICIPANT'; payload: Participant }
  | { type: 'REMOVE_PARTICIPANT'; payload: number };

const ParticipantsContext = createContext<
  | {
      participantsState: ParticipantsState;
      participantsDispatch: React.Dispatch<ParticipantsAction>;
    }
  | undefined
>(undefined);

const participantsReducer = (
  state: ParticipantsState,
  action: ParticipantsAction
): ParticipantsState => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      if (state.participants.find((p) => p.id === action.payload.id)) {
        return { participants: state.participants };
      }
      return { participants: [...state.participants, action.payload] };
    case 'REMOVE_PARTICIPANT':
      return {
        participants: state.participants.filter((p) => p.id !== action.payload),
      };
  }
};

export const ParticipantsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [participantsState, participantsDispatch] = useReducer(
    participantsReducer,
    { participants: [] }
  );

  return (
    <ParticipantsContext.Provider
      value={{ participantsState, participantsDispatch }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
};

export const useParticipantsContext = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw new Error(
      'useParticipantContext must be used within ParticipantsProvider!'
    );
  }
  return context;
};
