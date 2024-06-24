import React, { FC } from 'react';
import { MockFilmPeople } from '../../mock/festivalPeople';
import ContactsCard from './ContactsCard';

type ContactsRowProps = {
  filmPeople: MockFilmPeople[];
};

const ContactsRow: FC<ContactsRowProps> = ({ filmPeople }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {filmPeople.map((person) => (
        <ContactsCard person={person}></ContactsCard>
      ))}
    </div>
  );
};

export default ContactsRow;
