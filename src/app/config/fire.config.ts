import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBsmdxj7YkP4RNrXUlCb8hxeyofi57-OFQ',
  authDomain: 'pas-app-fdd59.firebaseapp.com',
  databaseURL: 'https://pas-app-fdd59-default-rtdb.firebaseio.com',
  projectId: 'pas-app-fdd59',
  storageBucket: 'pas-app-fdd59.appspot.com',
  messagingSenderId: '264226845893',
  appId: '1:264226845893:web:85403a50597330fd55ecac',
  measurementId: 'G-584F33VMJ6',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
