export interface Midia {
  id?: number;
  extensao: string;
  descricao: string;
  url: string;
  createdAt: string;
  changedAt: string;
}
export type Midias = Midia[];

export interface MidiaInput {
  descricao: string;
  extensao: string;
  url: string;
}
