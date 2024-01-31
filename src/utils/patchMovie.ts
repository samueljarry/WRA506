import headers from './headers';
import { ApiRoutesId } from '../constants/ApiRoutesId';
import { MethodsId } from '../constants/MethodsId';



export const patchMovie = async ({ actors, category, ...movie }: Movie) => {
  const actorsRoutes = actors.map(({ id }: Partial<Actor>) => ApiRoutesId.RAW_ACTOR + id);
  
  await fetch(ApiRoutesId.MOVIES + `/${movie.id}`, { 
    method: MethodsId.PATCH,
    headers: {
      ...headers.headers,
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