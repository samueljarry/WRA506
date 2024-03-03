export class ApiRoutesId {
  public static readonly BASE = import.meta.env.VITE_API_BASE;
  public static readonly API = this.BASE + '/api';
  
  public static readonly AUTHENTICATION = this.BASE + '/auth';
  
  public static readonly MOVIES = this.API + '/movies';
  public static readonly ACTORS = this.API + '/actors';
  public static readonly CATEGORIES = this.API + '/categories';
  public static readonly NATIONALITY = this.API + '/nationalities';
  public static readonly MEDIA_OBJECT = this.API + '/media_objects';

  public static readonly RAW_MOVIE = '/symfony-s5/public/index.php/api/movies/';
  public static readonly RAW_ACTOR = '/symfony-s5/public/index.php/api/actors/';
  public static readonly RAW_CATEGORY = '/symfony-s5/public/index.php/api/categories/';
  public static readonly RAW_NATIONALITY = '/symfony-s5/public/index.php/api/nationalities/';
  public static readonly RAW_MEDIA_OBJECT = '/symfony-s5/public/index.php/api/media_objects/';
}