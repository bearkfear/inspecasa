import { auth } from 'firebase';
import verifyTokenIsValid from "./verifyTokenIsValid";

export default function() { 
  const isValid = verifyTokenIsValid();

  if (isValid === undefined) return Promise.reject('Não existe uma Token')

  const currentUser = auth().currentUser;

  if (!currentUser) { 
    return Promise.reject("Não foi possível reconhecer um usuário autenticado");
  }


  return currentUser
    .getIdToken(true)
    .then(refreshToken => {
      localStorage.setItem('token', refreshToken);
      return Promise.resolve();
    })
    .catch(()=> { 
      return Promise.reject("Não foi possível efetuar a atualização do token");
    })

}