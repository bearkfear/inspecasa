import gql from "graphql-tag";

export const GET_CLIENTES = gql`
	query clientes {
		clientes {
			id
			nome
			sobrenome
			email
			urlImg
			bio
			changedAt
			createdAt
		}
	}
`;


export const DELETE_CLIENTE = gql`
	mutation deleteCliente($id: ID!) { 
		deleteCliente(id: $id)
	}

`

export const UPDATE_CLIENTE = gql`
	mutation updateCliente($cliente: ClienteInput!, $id: ID!) {
		updateCliente(id: $id, cliente: $cliente) {
			id
			createdAt
			changedAt
		}
	}
`

export const STORE_CLIENTE = gql`
	mutation addCliente($cliente: ClienteStore!) {
		storeCliente(cliente: $cliente) {
			id
			createdAt
			changedAt
		}
	}
`


export const GET_CLIENTE = gql`
	query cliente($id: ID!) { 
		cliente(id: $id) {
			id
			nome
			sobrenome
			email
			bio
			createdAt
			changedAt
			urlImg
		}
	}

`