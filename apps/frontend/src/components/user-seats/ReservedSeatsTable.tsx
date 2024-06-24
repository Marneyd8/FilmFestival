import { useUserSeats } from '../../hooks/useSeats';
import { useLocalStorageUser } from '../../hooks/useAuth';
import ReservedSeat from './ReservedSeat';

const ReservedSeatsTable = () => {
  const [user, _setUser] = useLocalStorageUser();
  const { data: reservedSeats, isSuccess } = useUserSeats(user ? user.id : '');

  if (!user) {
    return <div>You need to login first!</div>;
  }

  return (
    <div className="text-white">
      {isSuccess &&
        reservedSeats.items.map((seat) => (
          <ReservedSeat key={seat.id} seat={seat} />
        ))}
    </div>
  );
};

export default ReservedSeatsTable;
