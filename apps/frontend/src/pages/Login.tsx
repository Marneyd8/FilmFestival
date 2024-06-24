import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import NavbarLine from '../components/ui/NavbarLine';
import RegistrationForm from '../components/forms/RegistrationForm';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="bg-black px-8 min-h-screen">
      <NavbarLine />
      <div className="flex justify-center text-white">
        <div className={`${showLogin ? 'block' : 'hidden'}`}>
          <LoginForm toggleForm={toggleForm} />
        </div>
        <div className={`${showLogin ? 'hidden' : 'block'}`}>
          <RegistrationForm toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
};

export default Login;
