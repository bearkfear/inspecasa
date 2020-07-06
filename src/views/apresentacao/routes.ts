import { RouteConfig } from "vue-router";

const apresentacaoRoutes: Array<RouteConfig> = [
	{
		name: "apresetacao-imovel",
		path: "/show/imovel/:id",
		component: () => import("./Imovel.vue"),
		meta: {
			requireAuth: true
		}
	},
	{
		name: "apresetacao-usuario",
		path: "/show/usuario/:id",
		component: () => import("./Usuario.vue"),
		meta: {
			requireAuth: true
		}
	}
];

export default apresentacaoRoutes;
