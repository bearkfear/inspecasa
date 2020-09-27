import AsyncStorage  from '@react-native-community/async-storage';
// @ts-ignore
import decode from "jwt-decode"
import firebase from "firebase/app";

export const getToken = (token: string | null): Promise<string> => new Promise((resolve, reject) => {



	const currentToken = token
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
			return resolve("");
		}
		
		user.getIdToken(true).then((token) => { 
			resolve(token);
		})
	})
})

