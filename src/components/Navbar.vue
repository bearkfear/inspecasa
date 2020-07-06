<template>
	<b-navbar shadow >
			<template slot="brand" >
				<b-navbar-item tag="router-link" :to="{ path: '/' }">
					<img src="@/assets/logo.svg" alt="Logo da empresa Inspecasa" />
				</b-navbar-item>
			</template>

			<template slot="start" v-if="$route.meta.requireAuth">
				<b-navbar-item tag="router-link" to="/cadastro/cliente">
					<p>Clientes</p>
				</b-navbar-item>
				<b-navbar-item tag="router-link" to="/cadastro/imovel">
						<p>Imóveis</p>
				</b-navbar-item>

				<b-navbar-item tag="router-link" to="/cadastro/usuario">
					<p>Usuários</p>
				</b-navbar-item>
			</template>

			<template slot="end" v-if="$route.meta.requireAuth">
				<User></User>
			</template>
	</b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import User from "./User.vue";

export default Vue.extend({
	components: {
		User
	}
});
</script>

<style lang="sass" scoped>

</style>
