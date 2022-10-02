import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseApp = {
  apiKey: "AIzaSyCaE_CREA7vojc9D-1_W8jZy3mQzQlTjY4",
  authDomain: "gr62project.firebaseapp.com",
  projectId: "gr62project",

  storageBucket: "gr62project.appspot.com",
  messagingSenderId: "1089744624950",
  appId: "1:1089744624950:web:3ed5f8dee6016df6106797",
};

// init services
export default initializeApp(firebaseApp);

export const db = getFirestore();
export const auth = getAuth();

//export const auth = firebaseApp.auth();

/*db.collection("Users")
  .get()
  .then((querySnapshort) => {
    const data = querySnapshort.docs.map((doc) => doc.data());
    console.log(data);
  });
*/
