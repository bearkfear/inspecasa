<template>
	<b-navbar shadow>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<img src="@/assets/logo.svg" alt="Logo da empresa Inspecasa" />
			</b-navbar-item>
		</template>

		<template slot="start">
			<b-navbar-dropdown label="Cadastros" aria-label="Cadastros" hoverable>
				<b-navbar-item tag="router-link" to="/cadastro/cliente">
					<p>Clientes</p>
				</b-navbar-item>
				<b-navbar-item tag="router-link" to="/cadastro/imovel">
					<p>Imóveis</p>
				</b-navbar-item>
				<b-navbar-item tag="router-link" to="/cadastro/endereco">
					<p>Endereços</p>
				</b-navbar-item>
			</b-navbar-dropdown>
		</template>

		<template slot="end">
			<b-navbar-item tag="div">
				<b-dropdown hoverable>
					<template slot="trigger">
						<b-navbar-item>
							<div class="level">
								<div class="level-left"><p>Enrico Da Silva</p></div>
								<div class="level-rigth">
									<img src="@/assets/user-placeholder.jpeg" />
								</div>
							</div>
						</b-navbar-item>
					</template>
					<b-dropdown-item>
						<div class="level">
							<div class="level-left">
								<b-icon icon="calendar"></b-icon>
							</div>
							<div class="level-rigth"><p>Perfil</p></div>
						</div>
					</b-dropdown-item>
					<b-dropdown-item>
						<div class="level">
							<div class="level-left">
								<b-icon icon="calendar"></b-icon>
							</div>
							<div class="level-rigth"><p>Sair</p></div>
						</div>
					</b-dropdown-item>
				</b-dropdown>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>
