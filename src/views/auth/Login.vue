<template>
	<section class="hero is-white is-fullheight">
		<div class="hero-head">
			<Navbar :only-logo="true"></Navbar>
		</div>
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-4 notification">
						<h1 class="title is-3">Acesse o sistema</h1>
						<form v-on:submit.prevent="handleSubmit">
							<b-field label="E-mail">
								<b-input
									expanded
									type="email"
									v-model="email"
									placeholder="Digite o seu email de acesso"
								></b-input>
							</b-field>
							<b-field label="Senha">
								<b-input
									type="password"
									v-model="password"
									placeholder="**************"
									:password-reveal="true"
								></b-input>
							</b-field>
							<b-message v-if="authError" type="is-danger">
								{{ authError }}
							</b-message>
							<button
								class="button is-success is-fullwidth is-medium is-light"
								:disabled="isSubmitting"
								:loading="isSubmitting"
								@click="handleSubmit(email, password)"
							>
								Entrar
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import EventBus from "@/eventBus";
import firebase from "firebase";

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
	components: {
		Navbar
	},
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
				this.authError = e.code;
			}
		}
	}
});
</script>

<style lang="css">
.bg-fb {
	background-color: #5061a6;
	color: #fff;
}
.bg-gg {
	background-color: #4285f4;
	color: #fff;
}
</style>
