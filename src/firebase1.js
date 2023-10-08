import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA_lPaet9vM1pYtqiiT0Z-0cb-m8duswaM",
    authDomain: "push-notify-e81c5.firebaseapp.com",
    projectId: "push-notify-e81c5",
    storageBucket: "push-notify-e81c5.appspot.com",
    messagingSenderId: "196391903125",
    appId: "1:196391903125:web:4449db76e7ab3c9144609c",
    measurementId: "G-WB56WL7HF1"
  };;

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
