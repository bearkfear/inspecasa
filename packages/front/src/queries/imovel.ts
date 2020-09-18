import gql from "graphql-tag";
import { http } from "@/configs/graphql";


/**
 * Comunica com o backend avisando que o imóvel foi vendido pelo valor x dos compradores n
 * @param id Identificador do imóvel
 * @param compradores IDS dos compradores (clientes)
 * @param situacao 1 - deve continuar a venda. 0 - esconder da listagem
 * @param valor Valor em float do valor vendido sendo dividido entre os clientes compradores
 */

export async function venderImovel(id: number, compradores: number[], valor: number, situacao: number = 1) { 
	const MUTATION = gql`
		mutation venderImovel($id: ID!, $compradores: [ID!]!, $valor: Float!, $situacao: Int) {
			venderImovel(
				id: $id, 
				compradores: $compradores, 
				situacao: $situacao, 
				valorVenda: $valor
			)
		}	
	`;

	return http.mutate<{ venderImovel: boolean }>({
		mutation: MUTATION,
		variables: { 
			id,
			compradores,
			situacao,
			valor
		}
	}).then(resp => { 
		return resp.data!.venderImovel
	})
}


export const GET_PROPRIETARIOS_ID_IMOVEL = gql`
	query proprietariosImovel($id: ID!) {
		imovel(id: $id) {
			id
			proprietarios {
				id
			}
		}
	}	
`

export const GET_IMOVEL = gql`
	query imovel($id: ID!) {
		imovel(id: $id) {
			id
			categoria
			descricao
			numQuartos
			valorProposta
			updatedAt
			situacao
			proprietarios {
				id
				nome
				sobrenome
				email
				urlImg
			}
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

export const UPDATE_IMOVEL = gql`
	mutation updateImovel($id: ID!, $imovel: ImovelInput!) { 
		updateImovel(id: $id, imovel: $imovel) {
			id
		}
	}
`

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

/**
 * Usado na edicao do imovel
 */
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


export const GET_VISTORIAS_FROM_IMOVEL = gql`
	query getVistoriasFromImovel($imovelId: ID!) { 
		imovel(id: $imovelId) {
			id
			vistorias {
				id
				createdAt
				observacao
				responsavel {
					id
					nome
					sobrenome
					email
					urlImg
				}
				midias {
					id
					url
					extensao
					createdAt
					descricao
				}
			}
		}
	}

`


export const DELETE_IMOVEL = gql`

	mutation deleteImovel($id: ID!) { 
		deleteImovel(id: $id) 
	}
`