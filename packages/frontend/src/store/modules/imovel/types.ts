export type VenderImovel = { id: number, compradores: number[], valor: number, situacao?: number };
export interface Imovel { 
  
}

export default interface Auth { 
  imoveis: Imovel[],
}
