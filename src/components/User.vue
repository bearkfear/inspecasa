<template>
	<b-navbar-item tag="div" v-if="usuario">
		<b-dropdown hoverable>
			<template slot="trigger">
				<b-navbar-item>
					<div class="media">
						<div class="media-left">
							<p>{{ usuario.nome }} {{ usuario.sobrenome }}</p>
							<small class="has-text-weight-bold">{{ usuario.funcao }}</small>
						</div>
					</div>
					<img class="user-img" :src="usuario.urlImg" />
				</b-navbar-item>
			</template>
			<b-dropdown-item @click="logoutUser()">
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
		uid: ""
	}),
	methods: {
		logoutUser() {
			localStorage.removeItem("token-jwt");
			this.$router.push({ path: "/auth" });
		}
	},
	created() {
		const token = localStorage.getItem("token-jwt");
		if (token) {
			const decodedToken = decode(token);
			console.log(decodedToken);
			this.uid = decodedToken.user_id;
		}
	},
	apollo: {
		usuario: {
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
			variables() {
				return {
					id: this.uid
				};
			}
		}
	}
});
</script>

<style scoped>
.user-img {
	max-width: 48px;
	max-height: 48px;
	width: 48px;
	height: 48px;
	border-radius: 50%;
}
</style>
