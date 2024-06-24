import React, { FC } from 'react';
import CompanyCard from './CompanyCard';
import { MockFestivalInfo } from '../../mock/festivalInfo';

type CompanyRowProps = {
  festivalInfo: MockFestivalInfo[];
};

const CompanyRow: FC<CompanyRowProps> = ({ festivalInfo }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {festivalInfo.map((info) => (
        <CompanyCard info={info}></CompanyCard>
      ))}
    </div>
  );
};

export default CompanyRow;
