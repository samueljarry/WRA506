export enum ApiRoutesId {
  BASE = 'http://localhost:8088/symfony-s5/public/index.php',
  API = ApiRoutesId.BASE + '/api',
  
  AUTHENTICATION = ApiRoutesId.BASE + '/auth',
  
  MOVIES = ApiRoutesId.API + '/movies',
  ACTORS = ApiRoutesId.API + '/actors',
  CATEGORIES = ApiRoutesId.API + '/categories',
  NATIONALITY = ApiRoutesId.API + '/nationalities',
  MEDIA_OBJECT = ApiRoutesId.API + '/media_objects',

  RAW_MOVIE = '/symfony-s5/public/index.php/api/movies/',
  RAW_ACTOR = '/symfony-s5/public/index.php/api/actors/',
  RAW_CATEGORY = '/symfony-s5/public/index.php/api/categories/',
  RAW_NATIONALITY = '/symfony-s5/public/index.php/api/nationalities/',
  RAW_MEDIA_OBJECT = '/symfony-s5/public/index.php/api/media_objects/',
}