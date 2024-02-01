import { ApiRoutesId } from '../../../constants/ApiRoutesId';
import { MethodsId } from '../../../constants/MethodsId';
import defaultHeaders from '../headers';

export const addMovie = async ({ actor, category, ...movie }: Movie): Promise<void> => {
  const actorsRoutes = actor.map(({ id }: Partial<Actor>) => ApiRoutesId.RAW_ACTOR + id);
  
  await fetch(ApiRoutesId.MOVIES, { 
    method: MethodsId.POST,
    headers: {
      ...defaultHeaders.headers,
      'Content-Type': 'application/json'
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