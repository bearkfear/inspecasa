import { RouteConfig } from "vue-router";

const apresentacaoRoutes: Array<RouteConfig> = [
	{
		name: "apresetacao-imovel",
		path: "/show/imovel/:id",
		component: () => import("./Imovel.vue")
	}
];

export default apresentacaoRoutes;
