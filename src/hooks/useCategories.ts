import { ApiRoutesId } from "../constants/ApiRoutesId"
import headers from "../utils/headers"

export const useCategories = async (): Promise<any> => {
  const categories = await fetch(ApiRoutesId.CATEGORIES, headers).then(res => res.json());
  return categories;
}