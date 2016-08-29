import firebase from 'firebase'

var config = {
  apiKey: process.env.API_KEY,
  authDomain: "pb-jealous.firebaseapp.com",
  databaseURL: "https://pb-jealous.firebaseio.com",
  storageBucket: "pb-jealous.appspot.com",
};

firebase.initializeApp(config);
