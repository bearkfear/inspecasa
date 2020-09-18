export interface User { 
  token: string,
  uid: string,
  id: number,
  funcao: string,
  nome: string,
  sobrenome: string,
  urlImg: string,
}

export default interface Auth { 
  lastEmail: string | null;
  authorized: boolean;
	user: Partial<User>;
}