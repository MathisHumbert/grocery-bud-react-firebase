import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDVLc_85j9CevOS7ODCMbysvFTXFHZfwV4',
  authDomain: 'grocery-bud-2d6a6.firebaseapp.com',
  projectId: 'grocery-bud-2d6a6',
  storageBucket: 'grocery-bud-2d6a6.appspot.com',
  messagingSenderId: '726708401504',
  appId: '1:726708401504:web:a3485ee1b08c57eb409a05',
};

initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
