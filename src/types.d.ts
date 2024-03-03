declare type Category = {
  name: string;
  id: number;
  movies: Array<Movie>;
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
  image: {
    filePath: string;
  }
}

declare type MediaObject = {
  filePath: string;
  id: number;
}

declare type Nationality = {
  id: number;
  name: string;
}