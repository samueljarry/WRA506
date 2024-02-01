import { ApiRoutesId } from "../constants/ApiRoutesId";
import defaultHeaders from '../utils/requests/headers';

export const useNationalities = async (): Promise<Array<Nationality>> => {
  const nationalities = await fetch(ApiRoutesId.NATIONALITY, { ...defaultHeaders, }).then(res => res.json());
  return nationalities;
}