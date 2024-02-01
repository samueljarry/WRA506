import { ApiRoutesId } from '../constants/ApiRoutesId';
import defaultHeaders from '../utils/requests/headers';

export const useMovies = async (): Promise<Movie[]> => {
  const categories = await fetch(ApiRoutesId.MOVIES, defaultHeaders).then(res => res.json());
  return categories;
}   