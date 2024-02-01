import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.scss';


createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(DialogService)
  .mount('#app')
