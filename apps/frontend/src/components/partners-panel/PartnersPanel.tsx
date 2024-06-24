import React from 'react';
import { partners } from '../../mock/partners';

const PartnersPanel = () => {
  const size = 8;
  return (
    <div className="flex flex-col justify-around md:flex-row w-full">
      {partners.slice(0, size).map((partner, index) => (
        <React.Fragment key={partner.name}>
          <div className="p-4">
            <h3 className="text-xs font-semibold mb-2">{partner.name}</h3>
            <p className="text-xs text-gray-400">{partner.originCountry}</p>
          </div>
          {index < (size-1) && (
            <div className="border-l-2 border-rose-900 mt-5 h-8"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PartnersPanel;
