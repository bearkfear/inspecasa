import gql from "graphql-tag";

export const ADD_VISTORIA = gql`
  mutation addVistoria($imovelId: ID!, $vistoriaInput: VistoriaInput!) { 
    storeVistoria(imovelId: $imovelId, vistoria: $vistoriaInput)
  }

`