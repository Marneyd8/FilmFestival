import { FC } from 'react';
import { MockPartner } from '../../mock/partners';
import PartnerCard from './PartnerCard';


type PartnerRowProps = {
  text: string;
  partners: MockPartner[];
};


const PartnersRow: FC<PartnerRowProps> = ({text, partners}) => {
  return (
    <div className="grid grid">
        <h2 className="text-3xl font-semibold text-center mb-4">{text}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {partners.map((partner) => (
            <PartnerCard partner={partner}></PartnerCard>
          ))}
        </div>
      </div>
  );
};

export default PartnersRow;
