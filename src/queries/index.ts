import gql from "graphql-tag";

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

export const GET_USER = gql`
	query usuario($uid: ID!) {
		usuario(uid: $uid) {
			id
			nome
			sobrenome
			urlImg
			funcao
		}
	}
`;

export const STORE_IMOVEL_ENDERECO = gql`
	mutation storeImovelAndEndereco(
		$vendedor: ID!
		$imovel: ImovelInput!
		$owners: [ID!]!
		$endereco: EnderecoInput!
	) {
		storeImovel(vendedor: $vendedor, imovel: $imovel, owners: $owners) {
			id
		}
		storeEndereco(input: $endereco) {
			id
		}
	}
`;
