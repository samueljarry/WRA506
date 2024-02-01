import { ApiRoutesId } from "../constants/ApiRoutesId"
import defaultHeaders from "../utils/requests/headers"

export const getCategories = async (): Promise<Category[]> => {
  const categories = await fetch(ApiRoutesId.CATEGORIES, defaultHeaders).then(res => res.json());
  return categories;
}