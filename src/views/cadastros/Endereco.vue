<template>
	<div>
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<h1 class="title is-3">Endereços</h1>
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
						<tr>
							<td>João Machado Soares</td>
							<td>1240</td>
							<td>Bloco B5 apt 319</td>
							<td>Camobi</td>
							<td>Santa Maria</td>
							<td>RS</td>
							<td>97110-000</td>
							<td></td>
							<td></td>
							<td>Alguma coisa</td>
							<td>
								<b-button type="is-info" icon-left="edit" size="is-small"></b-button>
								<b-button type="is-danger" icon-left="trash" size="is-small"></b-button>
							</td>
						</tr>
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
	name: "endereco",
	components: {
		Navbar
	}
});
</script>
