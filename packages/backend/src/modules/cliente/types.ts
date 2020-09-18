import { Pessoa, funcao, uid, pessoa_tipo, email } from '@/database/types/pessoa';

export type Cliente = Exclude<keyof Pessoa, funcao | uid | pessoa_tipo>
export type ClienteInput = Partial<Omit<Cliente, email>>
