export enum ApiRoutesId {
  BASE = 'http://localhost:8088/s5/public/index.php',
  API = ApiRoutesId.BASE + '/api',
  
  AUTHENTICATION = ApiRoutesId.BASE + '/auth',
  
  MOVIES = ApiRoutesId.API + '/movies',
  ACTORS = ApiRoutesId.API + '/actors',
  CATEGORIES = ApiRoutesId.API + '/categories',

}