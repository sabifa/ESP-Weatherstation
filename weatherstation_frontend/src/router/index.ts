/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import VueRouter, { RouteConfig, Route } from 'vue-router';
import tokenService from '@/services/tokenService/tokenService';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: (): any =>
      import(/* webpackChunkName: "LoginPage" */ '../views/LoginPage.vue'),
    meta: {
      isPublic: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const redirectToLogin = (to: Route, next: any): void => {
  if (to.path !== '/login') {
    next({
      name: 'Login',
      params: {
        nextUrl: to.fullPath,
      },
    });
  } else {
    next();
  }
};

export const beforeEach = (to: Route, from: Route, next: any): any => {
  const isPublicRoute = to.matched.some((record) => record.meta.isPublic);
  const isAuthenticated = tokenService.getAccessToken();

  if (isAuthenticated && to.path === '/login') {
    next({ name: 'Home' });
  } else {
    if (isPublicRoute) {
      next();
    }

    if (isAuthenticated) {
      next();
    } else {
      redirectToLogin(to, next);
    }
  }
};

router.beforeEach((to, from, next) => beforeEach(to, from, next));

export default router;
