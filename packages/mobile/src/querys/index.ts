import { gql } from 'apollo-boost'

export const GET_CURRENT_USER = gql`
  query currentUser { 
    me { 
      id
      nome
      sobrenome
      bio
      email
      urlImg
      funcao
    }
  }
`

export interface Imovel {
  id: string;
  valorProposta: number | string;
  situacao: number;
  numQuartos: number;
  descricao: string;
  categoria: number;
}

export type GetImoveis = {
  imoveis: Imovel[]
}

export const GET_IMOVEIS = gql`
  query getImoveis { 
    imoveis {
      id
      valorProposta
      situacao
      numQuartos
      descricao
      categoria
    }
  }
`

export const GET_IMOVEL = gql`

  query getImovel($id: ID!) { 
    imovel(id: $id) {
      id
      categoria
      descricao
      endereco {
        avenida
        bairro
        cep
        cidade
        complemento
        id
        logradouro
        numero
        rua
        uf
      }
      numQuartos
      valorProposta
      situacao
    }   
  }
`

export const GET_VISTORIAS = gql`
  query getVistoriasFromImovel($id: ID!) { 
    imovel(id: $id) {
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

export const GET_MIDIAS_FROM_IMOVEL = gql`

  query getMidiasFromImovel($id: ID!) { 
    imovel(id: $id) {
      id
      midias {
        id
        changedAt
        createdAt
        url
        extensao
        descricao
      }
    }
  }

`

export const GET_DOCS_FROM_IMOVEL = gql`

  query getDocsFromImovel($id: ID!) { 
    imovel(id: $id) {
      id
      documentos {
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

export const ADD_VISTORIA = gql`
  mutation addVistoria($imovelId: ID!, $vistoriaInput: VistoriaInput!) { 
    storeVistoria(imovelId: $imovelId, vistoria: $vistoriaInput)
  }

`
