import firebase from 'firebase/app'
import 'firebase/auth'

function localFirebase () {
  let app = null
  return {
    app,
    install () {
      if (app) {

      } else {
        app = firebase.initializeApp({
          apiKey: 'AIzaSyBuCsKWavToboCNOm2p8W312kMUn0g0_yc',
          authDomain: 'inspecasa.firebaseapp.com',
          databaseURL: 'https://inspecasa.firebaseio.com',
          projectId: 'inspecasa',
          storageBucket: 'inspecasa.appspot.com',
          messagingSenderId: '608625010656',
          appId: '1:608625010656:web:6015d99a1857b75bd82d85',
          measurementId: 'G-4EW9HEE7MM'
        })

        app.auth().languageCode = 'pt-BR'
      }
    }
  }
}

export default localFirebase()
