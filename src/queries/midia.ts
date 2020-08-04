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