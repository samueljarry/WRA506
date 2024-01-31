import { ApiRoutesId } from "../constants/ApiRoutesId"
import defaultHeaders from "../utils/headers"

export const useCategories = async (): Promise<any> => {
  const categories = await fetch(ApiRoutesId.CATEGORIES, defaultHeaders).then(res => res.json());
  return categories;
}