import { ApiRoutesId } from "../constants/ApiRoutesId";
import headers from '../utils/headers';

export const useActors = async (): Promise<Array<Actor>> => {
  const actors = await fetch(ApiRoutesId.ACTORS + '?num=70', { ...headers, }).then(res => res.json());
  return actors;
}