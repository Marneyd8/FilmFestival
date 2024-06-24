import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSeatReservation } from '../../context/SeatReservationContext';
import { z } from 'zod';
import { billingInfoSchema } from '../../schemas/billingInfoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useBookMultipleSeats } from '../../hooks/useSeats';
import { useLocalStorageUser } from '../../hooks/useAuth';

type BillingFormProps = {
  onClose: () => void;
};

type BillingInfoData = z.infer<typeof billingInfoSchema>;

const BillingForm: React.FC<BillingFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [user, _setUser] = useLocalStorageUser();
  const { seatReservationState } = useSeatReservation();
  const { mutateAsync } = useBookMultipleSeats(user ? user?.id : '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingInfoData>({
    resolver: zodResolver(billingInfoSchema),
  });

  const onSubmit: SubmitHandler<BillingInfoData> = async (data) => {
    console.log(data, user);

    await mutateAsync(seatReservationState.seats.map((seat) => seat.id));
    navigate('/confirmation');
    console.log('Form submitted', data);
  };

  if (!user) {
    return <div>Prihlas se</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-xl mb-4">Billing Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-row mb-2 gap-4">
            <input
              {...register('address', { required: 'Address is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Address"
            />
            <input
              {...register('country', { required: 'State is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Country"
            />
          </div>
          <div className="flex flex-row mb-4 gap-4">
            <input
              {...register('city', { required: 'City is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="City"
            />
            <input
              {...register('zip', { required: 'ZIP Code is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Zip"
            />
          </div>
          <div className="mb-2">
            <input
              {...register('cardNumber', {
                required: 'Card Number is required',
              })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="XXXX XXXX XXXX XXXX"
            />
          </div>
          <div className="flex flex-row justify-between mb-4 gap-4">
            <input
              {...register('cvv', { required: 'CVV is required' })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="CVV"
            />
            <input
              {...register('cardExpirationMonth')}
              className="focus:outline-none focus:bg-white border-2 rounded-lg p-2 w-20"
              type="number"
              name="cardExpirationMonth"
              id="cardExpirationMonth"
              placeholder="MM"
            />
            <input
              {...register('cardExpirationYear')}
              className="focus:outline-none focus:bg-white border-2 rounded-lg p-2 w-20"
              type="number"
              name="cardExpirationYear"
              id="cardExpirationYear"
              placeholder="YY"
            />
          </div>
          <button
            type="submit"
            className="bg-rose-900 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-105 hover:cursor-pointer"
          >
            Send
          </button>
        </form>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        {errors.zip && <p className="text-red-500">{errors.zip.message}</p>}
        {errors.cardNumber && (
          <p className="text-red-500">{errors.cardNumber.message}</p>
        )}
        {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
        {errors.cardExpirationMonth && (
          <p className="text-red-500">{errors.cardExpirationMonth.message}</p>
        )}
        {errors.cardExpirationYear && (
          <p className="text-red-500">{errors.cardExpirationYear.message}</p>
        )}
      </div>
    </div>
  );
};

export default BillingForm;
