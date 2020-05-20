<template>
	<div>
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<h1 class="title is-3">Imóveis</h1>
				<table class="table is-striped is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Rua</th>
							<th>Número</th>
							<th>Complemento</th>
							<th>Bairro</th>
							<th>Cidade</th>
							<th>UF</th>
							<th>CEP</th>
							<th>Avenida</th>
							<th>Logradouro</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

import Navbar from "@/components/Navbar.vue";

export default Vue.extend({
	name: "imovel",
	components: {
		Navbar
	}
});
</script>
