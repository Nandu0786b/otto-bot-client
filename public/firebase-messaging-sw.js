importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA_lPaet9vM1pYtqiiT0Z-0cb-m8duswaM",
  authDomain: "push-notify-e81c5.firebaseapp.com",
  projectId: "push-notify-e81c5",
  storageBucket: "push-notify-e81c5.appspot.com",
  messagingSenderId: "196391903125",
  appId: "1:196391903125:web:4449db76e7ab3c9144609c",
  measurementId: "G-WB56WL7HF1"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
