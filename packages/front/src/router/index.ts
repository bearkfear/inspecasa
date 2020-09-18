import Vue from 'vue';
import VueRouter, { NavigationGuard } from 'vue-router';
import routes from '@/views/routes';
import verifyTokenIsValid from "@/utils/verifyTokenIsValid";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export const guard: NavigationGuard<Vue> = (to, from, next) => {
  NProgress.start();
  if (to.meta.requireAuth) {
    const isAuth = verifyTokenIsValid() !== undefined;
    // const isAuth: boolean = !!auth().currentUser;
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
router.afterEach(() => { NProgress.done()})
export default router;
