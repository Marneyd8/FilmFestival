import React, { FC } from 'react';
import { registrationSchema } from '../../schemas/authSchema';
import { z } from 'zod';
import { useLocalStorageUser, useRegister } from '../../hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type RegistrationFormProps = {
  toggleForm: () => void;
};

type RegistrationData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC<RegistrationFormProps> = ({ toggleForm }) => {
  const [_user, setUser] = useLocalStorageUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const { mutateAsync } = useRegister();

  const onSubmit = async (data: RegistrationData) => {
    try {
      const result = await mutateAsync(data);
      console.log(result);
      if (result !== undefined) {
        setUser(result.data.user);
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="border-4 border-rose-900 px-8 py-16 rounded-lg mx-2 md:mx-auto max-w-md md:max-w-lg lg:max-w-xl">
      <form
        className="flex flex-col justify-between mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-between mb-4">
          <label className="text-2xl p-2" htmlFor="name">
            Name
          </label>
          <input
            className="text-white bg-rose-900 p-4 text-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-900"
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col justify-between mb-4">
          <label className="text-2xl p-2" htmlFor="email">
            Email
          </label>
          <input
            className="text-white bg-rose-900 p-4 text-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-900"
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between mb-4">
          <div className="flex flex-col w-full">
            <label className="text-2xl p-2 text-left" htmlFor="password">
              Password
            </label>
            <input
              className="text-white bg-rose-900 p-4 text-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-900"
              type="password"
              id="password"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label
              className="text-2xl p-2 text-left md:text-right"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="text-white bg-rose-900 p-4 text-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-900"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-2xl mt-6">
          <button
            className="bg-rose-900 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-110 w-full"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <button
        onClick={toggleForm}
        className="text-blue-500 hover:underline text-center w-full"
      >
        Already have an account? Login
      </button>
    </div>
  );
};

export default RegistrationForm;
