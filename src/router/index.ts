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
    path: '/beers/details/:id',
    name: 'BeerDetails',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: 'beer-details" */ '../components/BeerDetails.vue'
      )
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
