import { ApiRoutesId } from "../constants/ApiRoutesId";
import defaultHeaders from '../utils/requests/headers';

export const getActors = async (): Promise<Array<Actor>> => {
  const actors = await fetch(ApiRoutesId.ACTORS + '?num=70', { ...defaultHeaders, }).then(res => res.json());
  return actors;
}