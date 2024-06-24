import React from 'react';
import { filmPeople } from '../mock/festivalPeople';
import { festivalInfo } from '../mock/festivalInfo';
import { socialLinks } from '../mock/festivalSocials';
import ContactsRow from '../components/contacts-panel/ContactsRow';
import CompanyRow from '../components/contacts-panel/CompanyRow';

const Contacts = () => {
  return (
    <div className='bg-black'>
      <div className="bg-rose-900 p-8 rounded-lg mx-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-4">
          People Who Helped Prepare the Film Festival
        </h2>
        <ContactsRow filmPeople={filmPeople}></ContactsRow>
      </div>
      <div className="p-8 text-white">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-11/12">
            <h2 className="text-3xl font-semibold mb-4">
              Festival and Company Information
            </h2>
            <CompanyRow festivalInfo={festivalInfo}></CompanyRow>
          </div>

          <div className="lg:w-1/10 lg:pl-8 mt-8 lg:mt-0">
            <h2 className="text-3xl font-semibold mb-4 text-center lg:text-left">
              Social Links
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                {socialLinks.map((link, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <img
                      src={link.icon}
                      alt={link.platform}
                      className="w-6 h-6"
                    />
                    <a
                      href={link.url}
                      className="text-black text-lg font-medium hover:underline"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
