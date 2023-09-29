import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Actors from './views/Actors.vue';
import Movies from './views/Movies.vue';
import Categories from './views/Categories.vue';

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
    ]
})

export default router