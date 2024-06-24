import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type PlainButtonProps = {
  title: string;
  link: string;
  color: string;
  onClick?: () => void;
};

const PlainButton: FC<PlainButtonProps> = ({ title, link, color, onClick }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <Link to={link} onClick={scrollToTop}>
      <button
        onClick={onClick}
        className={`bg-${color} text-white px-4 py-2 rounded-md transform transition-all duration-300 hover:scale-105 hover:cursor-pointer`}
      >
        <p className="">{title}</p>
      </button>
    </Link>
  );
};

export default PlainButton;
