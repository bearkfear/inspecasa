import { RouteConfig } from "vue-router";

const cadastroRoutes: Array<RouteConfig> = [
	{
		name: "cliente",
		path: "/cadastro/cliente",
		meta: {
			requireAuth: true,
		},
		component: () => import("./Cliente.vue")
	},
	{
		name: "usuario",
		path: "/cadastro/usuario",
		meta: {
			requireAuth: true,
		},
		component: () => import("./Usuario.vue")
	},
	{
		name: "endereco",
		path: "/cadastro/endereco",
		meta: {
			requireAuth: true,
		},
		component: () => import("./Endereco.vue")
	},
	{
		name: "imovel",
		path: "/cadastro/imovel",
		meta: {
			requireAuth: true,
		},
		component: () => import("./Imovel.vue")
	},
];

export default cadastroRoutes;
