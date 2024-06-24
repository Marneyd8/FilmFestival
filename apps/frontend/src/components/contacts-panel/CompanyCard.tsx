import React, { FC } from 'react';
import { MockFestivalInfo } from '../../mock/festivalInfo';

type CompanyCardProps = {
  info: MockFestivalInfo;
};

const CompanyCard: FC<CompanyCardProps> = ({ info }) => {
  return (
    <div className="bg-rose-900 p-6 rounded-lg shadow-md text-white">
      <h3 className="text-2xl font-semibold mb-2">{info.name}</h3>
      <p className="text-gray-400 mb-2">{info.description}</p>
      <p className="text-gray-400 mb-1">Address: {info.address}</p>
      <p className="text-gray-400">Email: {info.email}</p>
    </div>
  );
};

export default CompanyCard;
