import { RouteConfig } from "vue-router";

const cadastroRoutes: Array<RouteConfig> = [
	{
		name: "cliente",
		path: "/cadastro/cliente",
		component: () => import("./Cliente.vue")
	},
	{
		name: "endereco",
		path: "/cadastro/endereco",
		component: () => import("./Endereco.vue")
	},
	{
		name: "imovel",
		path: "/cadastro/imovel",
		component: () => import("./Imovel.vue")
	},
]

export default cadastroRoutes;