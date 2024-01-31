declare type Category = {
  name: string;
  id: number;
}

declare type Actor = {
  firstName: string;
  lastName: string;
  id: number;
  movies: Array<Movie>;
}

declare type Movie = {
  id: number;
  category: Array<Category>;
  entries: number;
  note: number;
  duration: number;
  releaseDate: string;
  description: string;
  title: string;
  director: string;
  actors: Array<Actor>;
}