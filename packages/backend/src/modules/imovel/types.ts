export interface Imovel {
  id?: string;
  descricao: string;
  valorProposta: number;
  categoria: number;
  numQuartos: number;
  situacao: number;
  createdAt: string;
  updatedAt: string;
}

export type Imoveis = Imovel[];

export interface ImovelInput {
  descrica: string;
  valorProposta: number;
  categoria: number;
  numQuartos: number;
  situacao: number;
}
