import firebase from 'firebase/app'
import 'firebase/auth'
const authentication = firebase.auth

interface IHandleResponse {
  uid: string;
  token: string;
}

async function handleResponse (response: firebase.auth.UserCredential): Promise<IHandleResponse> {
  try {
    const uid = response.user.uid
    const token = await response.user.getIdToken()
    return {
      uid,
      token
    }
  } catch (e) {
    throw new Error(e.message)
  }
}
export async function logout () {
  authentication().signOut()
}

export async function loginEmail (email: string, password: string) {
  try {
    const response = await authentication().signInWithEmailAndPassword(
      email,
      password
    )
    return handleResponse(response)
  } catch (e) {
    throw new Error(e.message)
  }
}
