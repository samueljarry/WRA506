export enum ApiRoutesId {
  BASE = 'http://localhost:8088/s5/public/index.php',
  API = ApiRoutesId.BASE + '/api',
  
  AUTHENTICATION = ApiRoutesId.BASE + '/auth',
  
  MOVIES = ApiRoutesId.API + '/movies',
  ACTORS = ApiRoutesId.API + '/actors',
  CATEGORIES = ApiRoutesId.API + '/categories',
  NATIONALITY = ApiRoutesId.API + '/nationalities',

  RAW_MOVIE = '/s5/public/index.php/api/movies/',
  RAW_ACTOR = '/s5/public/index.php/api/actors/',
  RAW_CATEGORY = '/s5/public/index.php/api/categories/',
  RAW_NATIONALITY = '/s5/public/index.php/api/nationalities/',
}