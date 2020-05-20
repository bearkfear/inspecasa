import { RouteConfig } from "vue-router";

const authRoutes: Array<RouteConfig> = [
  {
    name: "login",
    path: "/auth",
    component: () => import("./Login.vue")
  }
]

export default authRoutes;