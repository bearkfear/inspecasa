<template>
	<b-navbar-item tag="div">
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
					<figure v-else>
						<img class="user-img" :src="usuario.urlImg" />
					</figure>
				</b-navbar-item>
			</template>
			<b-dropdown-item @click="logoutUser()" v-if="!loading">
				<div class="media">
					<div class="media-left">
						<b-icon icon="id-card"></b-icon>
					</div>
					<div class="media-content">
						<p>Perfil</p>
					</div>
				</div>
			</b-dropdown-item>
			<b-dropdown-item @click="logoutUser()">
				<div class="media">
					<div class="media-left">
						<b-icon icon="sign-out-alt"></b-icon>
					</div>
					<div class="media-content"><p>Sair</p></div>
				</div>
			</b-dropdown-item>
		</b-dropdown>
	</b-navbar-item>
</template>

<script lang="ts">
import Vue from "vue";
// @ts-ignore
import decode from "jwt-decode";
import gql from "graphql-tag";

export default Vue.extend({
	data: () => ({
		usuario: null,
		loading: false
	}),
	methods: {
		logoutUser() {
			localStorage.removeItem("token-jwt");
			this.$router.push({ path: "/auth" });
		},
		fetchUser(uid: string) {
			this.loading = true;
			this.$apollo
				.query({
					query: gql`
						query usuario($id: ID!) {
							usuario(uid: $id) {
								nome
								sobrenome
								urlImg
								funcao
							}
						}
					`,
					variables: {
						id: uid
					}
				})
				.then(({ data }) => {
					this.usuario = data.usuario;
					this.loading = false;
				});
		}
	},
	created() {
		this.loading = true;
		const token = localStorage.getItem("token-jwt");
		if (token) {
			const decodedToken = decode(token);
			this.fetchUser(decodedToken.user_id);
		}
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
