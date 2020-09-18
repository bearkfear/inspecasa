import { Request, Response } from 'express';
import { auth } from 'firebase-admin';
import { Pessoa } from '@/database/types/pessoa';

export interface Session {
  req: Request;
  res: Response;
}

export type CurrentUser = auth.DecodedIdToken & Pessoa;

export interface AuthContext {
  currentUser: null | CurrentUser;
  token: null | string ;
}
