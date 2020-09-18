import gql from "graphql-tag";
export const UPDATE_ENDERECO = gql`
	mutation updateEndereco($id: ID!, $endereco: EnderecoInput!, $imovelId: ID!) {
		updateEndereco(id: $id, input: $endereco, imovelId: $imovelId) {
			id
		}
	}
`;
