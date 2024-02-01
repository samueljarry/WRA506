import defaultHeaders from '../headers';
import { ApiRoutesId } from '../../../constants/ApiRoutesId';
import { MethodsId } from '../../../constants/MethodsId';

export const patchMovie = async ({ actor, category, ...movie }: Movie) => {
  const actorsRoutes = actor.map(({ id }: Partial<Actor>) => ApiRoutesId.RAW_ACTOR + id);
  
  await fetch(ApiRoutesId.MOVIES + `/${movie.id}`, { 
    method: MethodsId.PATCH,
    headers: {
      ...defaultHeaders.headers,
      'Content-Type': 'application/merge-patch+json'
    },
    body: JSON.stringify({
      ...movie,
      category: ApiRoutesId.RAW_CATEGORY + category.id,
      actor: [
        ...actorsRoutes,
      ],
    })
  })
}