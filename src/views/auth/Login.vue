<template>
	<section class="section full-height">
		<div class="container">
			<div class="columns">
				<div class="column is-6">
					<div class="content is-spaced">
						<h1 class="title is-4">BEM VINDO</h1>
						<div class="m-auto">
							<img src="~@/assets/logo.svg" width="250px" class="m-auto" alt="Logo" />
						</div>
						<p class="">
							Acesse sua conta para ficar atualizado. Gerencie imóveis, suas inspeções e seu amplo
							acervo de informações em um único lugar
						</p>
						<hr />
						<b-field label="E-mail">
							<b-input
								expanded
								icon="at"
								type="email"
								size="is-medium"
								v-model="email"
								placeholder="Digite o seu email de acesso"
							></b-input>
						</b-field>
						<b-field label="Senha">
							<b-input
								type="password"
								icon="key"
								v-model="password"
								size="is-medium"
								placeholder="**************"
							></b-input>
						</b-field>
						<b-message v-if="authError" type="is-danger">
							{{ authError }}
						</b-message>

						<b-button
							:disabled="isSubmitting"
							:loading="isSubmitting"
							expanded
							type="is-primary"
							size="is-medium"
							@click="handleSubmit(email, password)"
							icon-right="sign-in-alt"
						>
							Entrar
						</b-button>
						<br />
						<hr />
						<p>v1.0.0-alpha - 2020 - Brasil</p>
					</div>
				</div>
				<div class="column is-6 background-image tile">
					<section class="hero">
						<div class="hero-body">
							<div class="container">
								<div class="m-auto">
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from "vue";

import firebase from "firebase/app";
import "firebase/auth";

interface Data {
	email: null | string;
	password: null | string;
	authError: null | string;
	isSubmitting: boolean;
}

// interface Computed {}

// interface Props {}

export default Vue.extend<Data, {}, {}, {}>({
	name: "login",
	data: () => ({
		email: null,
		password: null,
		authError: null,
		isSubmitting: false
	}),
	methods: {
		navigate(path: string) {
			this.$router.push(path);
		},
		async handleSubmit(email: string, password: string) {
			this.isSubmitting = true;

			try {
				const resp = await firebase.auth().signInWithEmailAndPassword(email, password);

				const { user } = resp;

				const token = await user?.getIdToken();
				localStorage.setItem("token-jwt", token || "");
				this.isSubmitting = false;
				this.$router.push({ path: "/" });
			} catch (e) {
				this.isSubmitting = false;
				this.authError = e.code;
			}
		}
	}
});
</script>

<style lang="scss">
.background-image {
	background-image: url("~@/assets/background-login-right.jpg");
	background-repeat: no-repeat;
	background-size: contain;
}

.full-height {
	display: flex;
	height: 100vh;
	align-items: center;
	align-content: center;
}

.m-auto {
	img {
		height: 60px;
	}
}
</style>
