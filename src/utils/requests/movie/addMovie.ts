import { ApiRoutesId } from '../../../constants/ApiRoutesId';
import { MethodsId } from '../../../constants/MethodsId';
import defaultHeaders from '../headers';

export const addMovie = async ({ actor, category, file, ...movie }: Movie & { file: string }): Promise<void> => {
  const actorsRoutes = actor.map(({ id }: Partial<Actor>) => ApiRoutesId.RAW_ACTOR + id);

  const mediaObject = await addMediaObject(file as string);
  console.log(mediaObject)

  const t = await fetch(ApiRoutesId.MOVIES, { 
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
      image: mediaObject
    })
  }).then(res => res.json())

  console.log(t)
}

const addMediaObject = async (file: string) => {
  let blob = await (await fetch(file)).blob();
  const formData = new FormData();
  formData.append('file', blob);

  const mediaObject = await fetch(ApiRoutesId.MEDIA_OBJECT, {
    method: MethodsId.POST,
    headers: {
      ...defaultHeaders.headers,
    },
    body: formData
  }).then(res => res.json())

  return ApiRoutesId.RAW_MEDIA_OBJECT + mediaObject.id;
}