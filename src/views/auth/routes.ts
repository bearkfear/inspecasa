import { RouteConfig } from "vue-router";

const authRoutes: Array<RouteConfig> = [
  {
    name: "login",
		path: "/auth",
		meta: {
			requireAuth: false
		},
    component: () => import("./Login.vue")
  }
];

export default authRoutes;
