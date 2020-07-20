import gql from "graphql-tag";
import { Midia } from "@/types";


export const ADD_MIDIA = gql`
	mutation addMidia($midia: MidiaInput!, $imovelId: ID!) {
		storeMidia(midia: $midia, imovelId: $imovelId) {
			id
		}
	}
`;

interface GetMidiasFromImovelContent { 
	id: number;
	midias: Midia[]
}

export interface GetMidiasFromImovel {
	imovel: GetMidiasFromImovelContent;
}

export const GET_MIDIAS_FROM_IMOVEL = gql`
	query getMidiasFromImovel($id: ID!) { 
		imovel(id: $id) {
			id
			midias {
				id
				changedAt
				createdAt
				descricao
				extensao
				url
			}
		}
	}
`


export const GET_IMOVEL_ENDERECO = gql`
	query imovelEndereco($idEndereco: ID!, $idImovel: ID!) {
		imovel(id: $idImovel) {
			descricao
			valorProposta
			categoria
			numQuartos
			situacao
		}
		endereco(id: $idEndereco) {
			cep
			rua
			logradouro
			complemento
			numero
			uf
			avenida
			cidade
			bairro
		}
	}
`;

export const GET_CLIENTES = gql`
	query clientes {
		clientes {
			id
			nome
			sobrenome
			email
			changedAt
			createdAt
		}
	}
`;

export const UPDATE_IMOVEL_ENDERECO = gql`
	mutation updateImovelAndEndereco(
		$imovel: ImovelInput!
		$endereco: EnderecoInput!
		$idEndereco: ID!
		$idImovel: ID!
	) {
		updateImovel(id: $idImovel, imovel: $imovel) {
			id
		}
		updateEndereco(id: $idEndereco, input: $endereco) {
			id
		}
	}
`;

export const UPDATE_ENDERECO = gql`
	mutation updateEndereco($id: ID!, $endereco: EnderecoInput!, $imovelId: ID!) {
		updateEndereco(id: $id, input: $endereco, imovelId: $imovelId) {
			id
		}
	}
`;

export const GET_IMOVEL = gql`
	query imovel($id: ID!) {
		imovel(id: $id) {
			id
			categoria
			descricao
			numQuartos
			valorProposta
			updatedAt
			endereco {
				bairro
				cep
				cidade
				complemento
				logradouro
				uf
				numero
			}
		}
	}
`;

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

export const STORE_USER = gql`
	mutation addUsuario($usuario: UsuarioStore!, $password: String!) {
		storeUsuario(usuario: $usuario, password: $password) {
			id
			createdAt
			changedAt
		}
	}
`

export const UPDATE_USER = gql`
	mutation updateUsuario($id: ID!, $usuario: UsuarioInput!) {
		updateUsuario(id: $id, usuario: $usuario) {
			urlImg
		}
	}
`;

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

export const STORE_IMOVEL_ENDERECO = gql`
	mutation storeImovelAndEndereco(
		$imovel: ImovelInput!
		$owners: [ID!]!
		$endereco: EnderecoInput!
	) {
		storeImovel(imovel: $imovel, owners: $owners) {
			id
		}
		storeEndereco(input: $endereco) {
			id
		}
	}
`;
