import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Actors from './views/catalogs/Actors.vue';
import Movies from './views/catalogs/Movies.vue';
import Categories from './views/catalogs/Categories.vue';
import Actor from './views/content/Actor.vue';
import Movie from './views/content/Movie.vue';
import Login from './views/Login.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    name: 'Accueil'
  },
  {
    path: '/actors',
    component: Actors,
    name: 'Acteurs'
  },
  {
    path: '/movies',
    component: Movies,
    name: 'Films'
  },
  {
    path: '/categories',
    component: Categories,
    name: 'Catégories'
  },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      ...routes,
      {
        path: '/login',
        component: Login,
        name: 'Connexion'
      },
      {
        path: '/actors/:id',
        component: Actor,
        name: 'Acteur'
      },
      {
        path: '/movies/:id',
        component: Movie,
        name: 'Film'
      }
    ]
})

export default router