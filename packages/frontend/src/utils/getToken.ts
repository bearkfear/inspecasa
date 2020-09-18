// @ts-ignore
import decode from "jwt-decode"
import firebase from "firebase/app";
const getToken = (): Promise<string> => new Promise((resolve, reject) => {

	const currentToken = localStorage.getItem('token');
	if (!currentToken) { 
		return resolve("");
	}

	const decodedToken = decode(currentToken);
	if (decodedToken.exp * 1000 > Date.now()) { 
		return resolve(currentToken)
	} 

	// invalid. renovar token
	const listener = firebase.auth().onAuthStateChanged(user => {
		listener();
		if (!user) { 
			localStorage.removeItem('token');
			return resolve("");
		}
		
		user.getIdToken(true).then((token) => { 
			localStorage.setItem('token', token);
			resolve(token);
		})
	})
})

export default getToken;