export type MockFilm = {
  id: number;
  title: string;
  votes: number;
  writer: string;
  sound: string;
  director: string;
  actors: string;
  annotations: string;
};

export const films: MockFilm[] = [
  { id: 11, title: 'The Descent', votes: -69420, writer: 'Frank Herbert', sound: 'Hans Zimmer', director: 'Denis Villeneuve', actors: 'Timothée Chalamet, Zendaya', annotations: 'Sequel to Dune' },
  { id: 1, title: 'Dune 2', votes: 69420, writer: 'Frank Herbert', sound: 'Hans Zimmer', director: 'Denis Villeneuve', actors: 'Timothée Chalamet, Zendaya', annotations: 'Sequel to Dune' },
  { id: 2, title: 'Winnie-the-Pooh: Blood and Honey', votes: -1, writer: 'A. A. Milne', sound: 'Christopher Robin', director: 'David Blue', actors: 'N/A', annotations: 'Horror adaptation' },
  { id: 3, title: 'Inception', votes: 1500, writer: 'Christopher Nolan', sound: 'Hans Zimmer', director: 'Christopher Nolan', actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt', annotations: 'Mind-bending thriller' },
  { id: 4, title: 'The Shawshank Redemption', votes: 2000, writer: 'Stephen King', sound: 'Thomas Newman', director: 'Frank Darabont', actors: 'Tim Robbins, Morgan Freeman', annotations: 'Prison drama' },
  { id: 5, title: 'The Godfather', votes: 1800, writer: 'Mario Puzo', sound: 'Nino Rota', director: 'Francis Ford Coppola', actors: 'Marlon Brando, Al Pacino', annotations: 'Mafia classic' },
  { id: 6, title: 'Pulp Fiction', votes: 1700, writer: 'Quentin Tarantino', sound: 'Various Artists', director: 'Quentin Tarantino', actors: 'John Travolta, Uma Thurman', annotations: 'Non-linear narrative' },
  { id: 7, title: 'The Dark Knight', votes: 19000, writer: 'Jonathan Nolan', sound: 'Hans Zimmer', director: 'Christopher Nolan', actors: 'Christian Bale, Heath Ledger', annotations: 'Iconic superhero film' },
  { id: 8, title: "Schindler's List", votes: 1600, writer: 'Thomas Keneally', sound: 'John Williams', director: 'Steven Spielberg', actors: 'Liam Neeson, Ralph Fiennes', annotations: 'Holocaust drama' },
  { id: 9, title: 'Forrest Gump', votes: 2100, writer: 'Winston Groom', sound: 'Alan Silvestri', director: 'Robert Zemeckis', actors: 'Tom Hanks, Robin Wright', annotations: 'Life story of Forrest' },
  { id: 10, title: 'Fight Club', votes: 1400, writer: 'Chuck Palahniuk', sound: 'Dust Brothers', director: 'David Fincher', actors: 'Brad Pitt, Edward Norton', annotations: 'Psychological thriller' },
];
