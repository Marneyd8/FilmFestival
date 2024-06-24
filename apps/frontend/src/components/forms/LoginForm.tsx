import { FC } from 'react';
import { z } from 'zod';
import { loginSchema } from '../../schemas/authSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorageUser, useLogin } from '../../hooks/useAuth';

type LoginFormProps = {
  toggleForm: () => void;
};

type LoginData = z.infer<typeof loginSchema>;

const LoginForm: FC<LoginFormProps> = ({ toggleForm }) => {
  const [_user, setUser] = useLocalStorageUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync } = useLogin();

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await mutateAsync(data);
      console.log(result);
      if (result !== undefined) {
        setUser(result.data.user);
        window.location.href = '/home';
      } else {
        alert('Incorrect email or password!');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="border-4 border-rose-900 px-8 py-16 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between w-96 mb-4"
      >
        <div className="flex flex-col justify-between mb-4">
          <label className="text-2xl p-2" htmlFor="email">
            Email
          </label>
          <input
            className="text-white bg-rose-900 p-4 text-xl rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-900"
            type="text"
            id="email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <label className="text-2xl p-2" htmlFor="password">
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
        <div className="text-2xl mt-6">
          <button
            className="bg-rose-900 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-110"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <button onClick={toggleForm} className="text-blue-500 hover:underline">
        Don't have an account? Register
      </button>
    </div>
  );
};

export default LoginForm;
