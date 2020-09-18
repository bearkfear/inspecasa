import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
	// Deletes ALL existing entries
	return knex("pessoa")
		.del()
		.then(() => {
			// Inserts seed entries
			return knex("pessoa").insert([
				{
					nome: "admin",
					sobrenome: "admin",
					email: "admin@inspecasa.site",
					bio: "Administrator of sys",
					uid: "yd1LrDAnAWQqn4SHOFRdv9bMxb03",
					tipo: 1
				}
			]);
		});
}
