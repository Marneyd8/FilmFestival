import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type LoginButtonProps = {
  title?: string;
};

const LoginButton: FC<LoginButtonProps> = ({ title }) => {
  return (
    <Link to="/auth/login">
      <button className="bg-rose-900 text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-110">
        {title ? title : 'Login'}
      </button>
    </Link>
  );
};

export default LoginButton;
