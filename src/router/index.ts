import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // route level code-splitting
    // this generates a separate chunk (calendar.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
  },
  {
    path: '/beers',
    name: 'Beers',
    component: () =>
      import(/* webpackChunkName: "beer-list" */ '../views/Beers.vue')
  },
  {
    path: '/beers/details/:id',
    name: 'BeerDetails',
    component: () =>
      import(
        /* webpackChunkName: 'beer-details" */ '../components/BeerDetails.vue'
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
