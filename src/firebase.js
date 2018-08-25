import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDz5dlA89UJVkjuHVR9Gx0bmQrYSFMOAMI",
  authDomain: "agent-real-estate.firebaseapp.com",
  databaseURL: "https://agent-real-estate.firebaseio.com",
  projectId: "agent-real-estate",
  storageBucket: "agent-real-estate.appspot.com",
  messagingSenderId: "306872391718"
};
firebase.initializeApp(config);
export default firebase;