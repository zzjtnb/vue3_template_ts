import {createRouter, createWebHashHistory} from 'vue-router';
const history = createWebHashHistory();

import routes from './routes';
const router = createRouter({
  history,
  routes: routes,
});

export default router;
