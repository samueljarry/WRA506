import { ApiRoutesId } from '../../../constants/ApiRoutesId';
import { MethodsId } from '../../../constants/MethodsId';
import defaultHeaders from '../headers';

export const patchActor = async ({ movies, nationality, ...actor}: Actor): Promise<void> => {
  const moviesRoutes = movies.map(({ id }: Partial<Movie>) => ApiRoutesId.RAW_MOVIE + id);
  
  await fetch(ApiRoutesId.ACTORS + `/${actor.id}`, { 
    method: MethodsId.PATCH,
    headers: {
      ...defaultHeaders.headers,
      'Content-Type': 'application/merge-patch+json'
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