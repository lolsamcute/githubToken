import Vue from 'vue';
import VueRouter from 'vue-router';

import { Notify } from 'quasar';
import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  //   Router.beforeEach((to, from, next) => {
  //     if (to.matched.some((record) => record.meta.auth)) {
  //       if (LocalStorage.getItem('token') === null || LocalStorage.getItem('token') === undefined) {
  //         next({
  //           path: '/admin/Authpage',
  //         });
  //         Notify.create({
  //           icon: 'ion-close',
  //           color: 'negative',
  //           message: 'UnAuthorized Authentication',
  //           actions: [{ icon: 'close', color: 'white' }],
  //         });
  //       } else {
  //         next();
  //       }
  //     } else {
  //       next();
  //     }
  //   });
  //   return Router;
  // }

  Router.beforeEach((to, from, next) => {
    const auth = store.state;
    if (to.matched.some((record) => record.meta.requiresAuth) && auth.isAuthenticated) {
      next({
        path: 'dashboard',
      });
      Notify.create({
        icon: 'ion-close',
        color: 'negative',
        message: 'Login Successfully',
        actions: [{ icon: 'close', color: 'white' }],
      });
    } else next();
  });

  return Router;
}
