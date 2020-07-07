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
