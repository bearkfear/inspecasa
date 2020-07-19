import Vue from 'vue';
import VueRouter, { NavigationGuard } from 'vue-router';
import routes from '@/views/routes';
import verifyTokenIsValid from '@/utils/verifyTokenIsValid';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export const guard: NavigationGuard<Vue> = (to, from, next) => {
  if (to.meta.requireAuth) {
    const isAuth = verifyTokenIsValid() !== undefined;
    if (isAuth) {
      next();
    } else {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
};

router.beforeEach(guard);
export default router;
