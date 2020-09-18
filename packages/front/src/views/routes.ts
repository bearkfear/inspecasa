import { RouteConfig } from "vue-router";
import AboutPage from "./About.vue";
import NotFindPage from "./NotFind.vue";
import authRoutes from "./auth/routes";
import cadastroRoutes from "./cadastros/routes";
import apresetacaoRoutes from "./apresentacao/routes";
import Dev from "./dev/Query.vue";

const routes: Array<RouteConfig> = [
	...authRoutes,
	...cadastroRoutes,
	...apresetacaoRoutes,
	{
		path: "/",
		component: () => import("./Dashboard.vue"),
		meta: {
			requireAuth: true,
		}
	},
	{
		name: "about",
		path: "/about",
		component: AboutPage,
		meta: {
			requireAuth: false,
		}
	},
	{
		name: "dev",
		path: "/tools",
		component: Dev,
		meta: {
			requireAuth: true,
		}
	},
	{
		path: "*",
		component: NotFindPage,
		meta: {
			requireAuth: false,
		}
	}
];

export default routes;
