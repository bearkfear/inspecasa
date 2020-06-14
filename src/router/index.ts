import Vue from "vue";
import VueRouter, { NavigationGuard } from "vue-router";
import routes from "../views/routes";
// @ts-ignore;
import decode from "jwt-decode";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export const guard: NavigationGuard<Vue> = (to, from, next) => {

	if (to.meta.requireAuth) {
		let isAuth = false;
		const token = localStorage.getItem('token-jwt');
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 > Date.now()) {
				isAuth = true;
			} else {
				// resignin user;
			}
		}
		if (isAuth) {
			next();
		} else {
			next({
				path: "/auth",
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next();
	}
};

router.beforeEach(guard);
export default router;
