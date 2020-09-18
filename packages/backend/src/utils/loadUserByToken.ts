import { auth } from 'firebase-admin';
import { CurrentUser } from '@/types';
import { Provider } from '@/modules/usuario/provider';
export async function loadUserByToken (token: string): Promise<CurrentUser | null> {
  if (typeof token !== 'string') return null;

  let currentUser = null;
  let user = null;
  try {
    currentUser = await auth().verifyIdToken(token);
  } catch (error) {
    console.log('error verifyToken', error);
    return null;
  }

  try {
    user = await new Provider().getUserByUid(currentUser.uid);
  } catch (error) {
    console.log('error database', error);
    return null;
  }
  if (user) {
    return {
      ...currentUser,
      ...user
    };
  }

  return null;
}
