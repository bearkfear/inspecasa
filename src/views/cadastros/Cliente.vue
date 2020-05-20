<template>
	<div>
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<div class="level">
					<div class="level-left">
						<h1 class="title is-4">Clientes</h1>
					</div>
					<div class="level-rigth">
						<b-button icon-left="plus" type="is-primary">Criar novo</b-button>
					</div>
				</div>
				<table class="table is-striped is-hoverable is-fullwidth">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Sobrenome</th>
							<th>Email</th>
							<th>Data Criação</th>
							<th>Ultimo Acesso</th>
							<th>Bio</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Enrico</th>
							<td>Da Silva</td>
							<td>camponogara5@gmail.com</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>Ser feliz não tem preço.</td>
							<td>
								<b-button icon-left="trash" type="is-warning" size="is-small"></b-button>
							</td>
						</tr>
						<tr>
							<th>Enrico</th>
							<td>Da Silva</td>
							<td>camponogara5@gmail.com</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>Ser feliz não tem preço.</td>
							<td>
								<b-button icon-left="trash" type="is-warning" size="is-small"></b-button>
							</td>
						</tr>
						<tr>
							<th>Enrico</th>
							<td>Da Silva</td>
							<td>camponogara5@gmail.com</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>Ser feliz não tem preço.</td>
							<td>
								<b-button icon-left="trash" type="is-warning" size="is-small"></b-button>
							</td>
						</tr>
						<tr>
							<th>Enrico</th>
							<td>Da Silva</td>
							<td>camponogara5@gmail.com</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>Ser feliz não tem preço.</td>
							<td>
								<b-button icon-left="trash" type="is-warning" size="is-small"></b-button>
							</td>
						</tr>
						<tr>
							<th>Enrico</th>
							<td>Da Silva</td>
							<td>camponogara5@gmail.com</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>{{ new Date().toLocaleString() }}</td>
							<td>Ser feliz não tem preço.</td>
							<td>
								<b-button icon-left="trash" type="is-warning" size="is-small"></b-button>
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
	name: "cliente",
	components: {
		Navbar
	}
});
</script>
