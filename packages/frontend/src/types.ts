import { StringIterator } from 'lodash';

export interface ViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}

export interface Endereco {
  rua: string | null;
  logradouro?: string | null;
  complemento?: string | null;
  numero: number | null;
  uf: string | null;
  cep: string;
  avenida: string | null;
  cidade: string | null;
  bairro: string | null;
}

export interface Usuario {
  id?: number | null;
  nome: string | null;
  sobrenome: string | null;
  funcao: string | null;
  email: string | null;
  bio: string | null;
  uid?: string | null;
  createdAt?: string | null;
  changedAt?: string | null;
  urlImg: string | null;
}

export interface Cliente {
  id?: number | null;
  nome: string | null;
  sobrenome: string | null;
  email: string | null;
  bio: string | null;
  createdAt?: string | null;
  changedAt?: string | null;
  urlImg: string | null;
}

export interface FileToUpload {
  id: string;
  progress: number;
  description: string;
  archive: File;
  extension: string;
}

export interface Midia {
  id: number;
  changedAt: string;
  createdAt: string;
  descricao: string;
  extensao: string;
  url: string;
}

export enum Categoria {
  Apartamento,
  Kitnet,
  Loft,
  Duplex,
  Triplex,
  Casa,
}

export declare module VendasUsuario {
  export interface Imovel {
    id: string;
    categoria: number | string;
    proprietarios: { 
      id: number;
      urlImg: string;
    }
  }

  export interface Venda {
    id: string;
    valor: number | string;
    data: string;
    imovel: Imovel;
  }

  export interface Usuario {
    id: string;
    vendas: Venda[];
  }

  export interface RootObject {
    usuario: Usuario;
  }
}
