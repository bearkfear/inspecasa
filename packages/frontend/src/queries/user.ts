import gql from "graphql-tag";
import { http  } from "@/configs/graphql" 
import { VendasUsuario } from "@/types"
import { ApolloQueryResult } from 'apollo-client';

export function getVendas(id: string | number): Promise<ApolloQueryResult<VendasUsuario.RootObject>> { 
	const query = gql`
		query getVendas($id: ID!) { 
			usuario(id: $id){ 
				id
				vendas {
					id
					valor
					data
					imovel{
						id
						categoria
						proprietarios { 
							id
							urlImg
						}
					}
				}
			}
		}
	`

	return http.query<VendasUsuario.RootObject>({
		query,
		variables: { 
			id
		}
	})
}


export const GET_ME = gql`
	query me {
		me {
			id
			nome
			sobrenome
			urlImg
			funcao
			uid
		}
	}
`;

export const DELETE_USER = gql`

	mutation deleteUser($id: ID!) { 
		deleteUsuario(id: $id)
	}
`

export const UPDATE_USER = gql`
	mutation updateUsuario($id: ID!, $usuario: UsuarioInput!) {
		updateUsuario(id: $id, usuario: $usuario) {
			urlImg
		}
	}
`;

export const STORE_USER = gql`
	mutation addUsuario($usuario: UsuarioStore!, $password: String!) {
		storeUsuario(usuario: $usuario, password: $password) {
			id
			createdAt
			changedAt
		}
	}
`

export const GET_USER = gql`
	query usuario($id: ID!) {
		usuario(id: $id) {
			id
			nome
			sobrenome
			funcao
			email
			bio
			uid
			createdAt
			changedAt
			urlImg
		}
	}
`;