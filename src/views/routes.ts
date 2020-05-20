import { RouteConfig } from "vue-router";
import AboutPage from "./About.vue";
import NotFindPage from "./NotFind.vue";
import DashboardPage from "./Dashboard.vue";
import authRoutes from "./auth/routes";
import cadastroRoutes from "./cadastros/routes";

const routes: Array<RouteConfig> = [
	...authRoutes,
	...cadastroRoutes,
	{
		path: "/",
		component: DashboardPage
	},
	{
		name: "about",
		path: "/about",
		component: AboutPage
	},
	{
		path: "*",
		component: NotFindPage
	}
];

export default routes;


