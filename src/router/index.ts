import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home
  },
  {
    path: '/calendar',
    name: 'Calendar',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (calendar.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
  },
  {
    path: '/beers',
    name: 'Beers',
    props: true,
    component: () =>
      import(/* webpackChunkName: "beer-list" */ '../views/Beers.vue')
  },
  {
    path: '/beer/:slug',
    name: 'BeerDetails',
    props: true,
    component: () =>
      import(/* webpackChunkName: "beer-details" */ '../views/Beer.vue')
  },
  {
    path: '/favourites',
    name: 'Favourites',
    props: true,
    component: () =>
      import(/* webpackChunkName: "favorite-beers" */ '../views/Favourites.vue')
  },
  {
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
