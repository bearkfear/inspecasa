import gql from "graphql-tag";

export const ADD_DOC = gql`
	mutation addDoc($input: DocumentoInput!, $imovelId: ID!) { 
		storeDocumento(input: $input, imovelId: $imovelId) {
			id
		}
	}

`

export const GET_DOCS_FROM_IMOVEL = gql`
	query getDocsFromImovel($id: ID!) { 
		imovel(id: $id) { 
			id
			documentos {
				id
				url
				descricao
				createdAt
				changedAt
			}
		}
	}

`