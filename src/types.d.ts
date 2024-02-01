declare type Category = {
  name: string;
  id: number;
}

declare type Actor = {
  firstName: string;
  lastName: string;
  id: number;
  nationality: Nationality;
  movies: Array<Movie>;
  rewards: string;
}

declare type Movie = {
  id: number;
  category: Category;
  entries: number;
  note: number;
  duration: number;
  releaseDate: string;
  description: string;
  title: string;
  director: string;
  actor: Array<Actor>;
}

declare type Nationality = {
  id: number;
  name: string;
}