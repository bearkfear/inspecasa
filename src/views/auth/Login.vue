<template>
	<section class="hero is-white is-fullheight">
		<div class="hero-head">
			<Navbar></Navbar>
		</div>
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-4  notification content">
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
							<button class="button is-success is-fullwidth is-medium is-light">Entrar</button>
						</form>
						<br />
						<p class="p">Ou acesse com</p>
						<div class="buttons">
							<b-button size="is-medium" expanded class="bg-gg" icon-left="google">Google</b-button>
							<b-button size="is-medium" expanded class="bg-fb" icon-left="facebook"
								>Facebook</b-button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";

export default {
	name: "login",
	components: {
		Navbar
	},
	data: () => ({
		email: null,
		password: null
	}),
	methods: {
		handleSubmit() {
			console.log("[SUBMIT LOGIN]");
		}
	}
};
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
