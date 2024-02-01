import { ApiRoutesId } from '../../../constants/ApiRoutesId';
import { MethodsId } from '../../../constants/MethodsId';
import defaultHeaders from '../headers';

export const addActor = async ({ movies, nationality, ...actor}: Actor): Promise<void> => {
  const moviesRoutes = movies.map(({ id }: Partial<Actor>) => ApiRoutesId.RAW_MOVIE + id);

  await fetch(ApiRoutesId.ACTORS, { 
    method: MethodsId.POST,
    headers: {
      ...defaultHeaders.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...actor,
      fullName: actor.firstName + ' ' + actor.lastName,
      movies: [
        ...moviesRoutes
      ],
      nationality: ApiRoutesId.RAW_NATIONALITY + nationality.id
    })
  });
}