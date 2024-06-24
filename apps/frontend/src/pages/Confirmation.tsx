import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-green-500 text-6xl"
      />
      <div className="text-2xl mt-5">Your reservation has been confirmed!</div>
    </div>
  );
};

export default Confirmation;
