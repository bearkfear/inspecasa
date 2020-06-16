<template>
	<b-navbar shadow>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<img src="@/assets/logo.svg" alt="Logo da empresa Inspecasa" />
			</b-navbar-item>
		</template>

		<template slot="start" v-if="$route.meta.requireAuth">
			<b-navbar-dropdown label="Cadastros" aria-label="Cadastros" hoverable>
				<b-navbar-item tag="router-link" to="/cadastro/cliente">
					<p>Clientes</p>
				</b-navbar-item>
				<b-navbar-item tag="router-link" to="/cadastro/imovel">
					<div class="level">
						<div class="level-left"></div>
						<div class="level-rigth">Imóveis</div>
					</div>
				</b-navbar-item>
				<b-navbar-item tag="router-link" to="/cadastro/endereco">
					<div class="level">
						<div class="level-left"></div>
						<div class="level-rigth">Endereços</div>
					</div>
				</b-navbar-item>
			</b-navbar-dropdown>
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
	},
});
</script>
