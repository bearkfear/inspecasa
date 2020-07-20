<template>
	<b-navbar-item tag="div" class="is-paddingless">
		<b-dropdown>
			<template slot="trigger">
				<b-navbar-item>
					<div class="media">
						<div class="media-left">
							<template v-if="loading">
								<b-skeleton animated active width="100px"></b-skeleton>
								<b-skeleton animated active width="100px"></b-skeleton>
							</template>
							<template v-else>
								<p>{{ usuario.nome }} {{ usuario.sobrenome }}</p>
								<small class="has-text-weight-bold">{{ usuario.funcao }}</small>
							</template>
						</div>
					</div>
					<b-skeleton v-if="loading" active animated circle width="48px" height="48px"></b-skeleton>
					<template v-else>
					<figure>
						<img class="user-img" :src="usuario.urlImg" />
					</figure>
					<b-icon icon="caret-down"></b-icon>
					</template>
				</b-navbar-item>
			</template>
			<b-dropdown-item :disabled="loading" has-link>
				<router-link
					:to="{
						path: `/show/usuario/${usuario && usuario.id}`
					}"
				>
					<div class="media">
						<div class="media-left">
							<b-icon icon="user-cog"></b-icon>
						</div>
						<div class="media-content">
							<p>Perfil</p>
						</div>
					</div>
				</router-link>
			</b-dropdown-item>
			<b-dropdown-item @click="logoutUser()" :disabled="loading">
				<div class="media">
					<div class="media-left">
						<b-icon icon="power-off"></b-icon>
					</div>
					<div class="media-content"><p>Sair</p></div>
				</div>
			</b-dropdown-item>
		</b-dropdown>
	</b-navbar-item>
</template>

<script lang="ts">
import Vue from "vue";
import { auth } from "firebase";
import "firebase/auth";
import { GET_ME } from "@/queries";

export default Vue.extend({
	data: () => ({
		usuario: null,
		loading: false
	}),
	methods: {
		logoutUser() {
			auth().signOut();
			localStorage.removeItem("token");
			this.$router.push({ path: "/auth" });
		},
		async fetchUser() {
			this.loading = true;
			const { data } = await this.$apollo.query({
				query: GET_ME
			});
			this.usuario = data.me;
			this.loading = false;
		}
	},
	created() {
		this.loading = true;
		this.fetchUser();
	}
});
</script>

<style scoped>
.user-img {
	max-width: 40px;
	max-height: 40px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
</style>
