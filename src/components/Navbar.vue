<template>
	<b-navbar shadow>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<img src="@/assets/logo.svg" alt="Logo da empresa Inspecasa" />
			</b-navbar-item>
		</template>

		<template slot="start" v-if="!onlyLogo">
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

		<template slot="end" v-if="!onlyLogo">
			<b-navbar-item tag="div">
				<b-dropdown hoverable>
					<template slot="trigger">
						<b-navbar-item>
							<div class="media">
								<div class="media-left">
									<p>Enrico Da Silva</p>
								</div>
								<div class="media-content">
									<img src="@/assets/user-placeholder.jpeg" />
								</div>
							</div>
						</b-navbar-item>
					</template>
					<b-dropdown-item>
						<div class="media">
							<div class="media-left">
								<b-icon icon="calendar"></b-icon>
							</div>
							<div class="media-content">
								<p>Perfil</p>
							</div>
						</div>
					</b-dropdown-item>
					<b-dropdown-item>
						<div class="media">
							<div class="media-left">
								<b-icon icon="calendar"></b-icon>
							</div>
							<div class="level-content"><p>Sair</p></div>
						</div>
					</b-dropdown-item>
				</b-dropdown>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	props: {
		onlyLogo: {
			default: false,
			required: false,
			type: Boolean
		}
	}
});
</script>
