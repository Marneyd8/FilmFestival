export type MockFestivalInfo = {
  name: string;
  description?: string;
  address: string;
  email: string;
};

export const festivalInfo: MockFestivalInfo[] = [
  {
    name: 'Film Festival Inc.',
    description: 'An international film festival showcasing the best films from around the world.',
    address: '123 Festival Lane, Film City, FC 12345',
    email: 'info@filmfestival.com',
  },
  {
    name: 'Cinema World',
    description: 'A company dedicated to the promotion of indie films.',
    address: '456 Cinema Blvd, Movie Town, MT 67890',
    email: 'contact@cinemaworld.com',
  },
  {
    name: 'Global Cinema Expo',
    description: 'Bringing together filmmakers and enthusiasts from all corners of the globe.',
    address: '789 Cinema Street, Global City, GC 98765',
    email: 'info@globalcinemaexpo.com',
  },
  {
    name: 'Indie Film Showcase',
    description: 'Showcasing the latest and greatest in independent cinema.',
    address: '101 Indie Avenue, Artistic Town, AT 54321',
    email: 'contact@indiefilmshowcase.com',
  },
];
