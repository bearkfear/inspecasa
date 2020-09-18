import { MidiaInput } from '../midia/types';
import { Vistoria as IVistoria } from '@/database/types/vistoria';
export type Vistoria = Pick<IVistoria, 'id' | 'created_at' | 'observacao'>
export type Vistorias = Vistoria[];

export interface VistoriaInput {
  observacao: string;
  midias: MidiaInput[];
}

export interface StoreVistoria {
  imovelId: number;
  vistoria: VistoriaInput;
}
