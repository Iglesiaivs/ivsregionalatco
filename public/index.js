
/**
 *  *  * Autor: jl_
   * ADSI - SENA
   * email: devluisluzardo@gmail.com
   * Fecha creacion : 21 - Sept- 2023
   * 
   * desscripcion:
  *
**/

//Firebase: Authentication
//Google Firebase : Google Popu up
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

//Firebase: RealTime Database
import {
  getDatabase,
  ref,
  set,
  onValue,
  query,
  orderByKey,
  get,
  limitToLast,
  equalTo,
  child,
  update
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

let direccion = "", celular = "", ciudad = "";

//Firebase: Initialize service
const firebaseApp = initializeApp({

  apiKey: "AIzaSyCjw1LBpUPDCVfh5jvHN6_MJkm3k-utfYE",
  authDomain: "ivsiglesiaregatco.firebaseapp.com",
  databaseURL: "https://ivsiglesiaregatco-default-rtdb.firebaseio.com",
  projectId: "ivsiglesiaregatco",
  storageBucket: "ivsiglesiaregatco.firebasestorage.app",
  messagingSenderId: "892878960949",
  appId: "1:892878960949:web:93bc8715bc0de5b9cd747c",
  measurementId: "G-K4L55LN63M"
});


const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);

// Asignamos el objeto a la constante
// Obtenemos el elemento botón
//const button = document.getElementById("login");
// Obtenemos el botón de cierre de sesión
//const logoutButton = document.getElementById("loginout");
// Obtenemos el botón de cierre de sesión, desde perfil
//const logoutButton2 = document.getElementById("loginout2");
// Obtenemos el elemento botón
const login = document.getElementById("login");
// Obtenemos el elemento botón
//const login2 = document.getElementById("login2");

//Desplegamos el boton: oCULTAR
//logoutButton.style.display = "none";
//login.style.display        = "none";

//Ocultamos el texto del modal perfil
//logoutButton2.style.display = "none";
//Desplegamos el texto del modal perfil
//login2.style.display    = "none";
// ...          



login.addEventListener("click", (e) => {
  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user);

      //Desplegamos el boton
      ////logoutButton.style.display = "block";
      //Ocultamos el boton
      ////login.style.display   = "none";          

      //Ocultamos el texto del modal perfil
      ////logoutButton2.style.display = "block";
      //Desplegamos el texto del modal perfil
      ////login2.style.display    = "none";
      // ...          

    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});



//AL cambiar el estado de autenticacion
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const uname = user.displayName;
    const uemail = user.email;
    let id = 1;

    //modal perfil: cuenta
    ////document.getElementById("idcuenta-nombre").innerText = "Nombre : " + uname;
    ////document.getElementById("idcuenta-email").innerText  = "Email : "  + uemail;

    //Ocultamos el botón
    ////login.style.display   = "none";
    //Desplegamos el botón
    ////logoutButton.style.display = "block";

    //Ocultamos el texto del modal perfil
    ////logoutButton2.style.display = "block";
    //Desplegamos el texto del modal perfil
    ////login2.style.display    = "none";
    // ...    

    const emailEncoded = btoa(uemail); // Codificar el email en Base64
    const db = getDatabase();

    const dbf = ref(db, 'usuario/idkey:' + emailEncoded);
    onValue(dbf, (snapshot) => {
      let data = snapshot.val();

      if (data !== null) {
        // Si data no es nulo, significa que hay un valor en el nodo
        console.log('Hay un valor en el nodo: ......... ');
        //console.log(data);
      }
      else {
        // Si data es nulo, significa que no hay un valor en el nodo
        console.log('No hay un valor en el nodo');
        const path = 'usuario/idkey:' + emailEncoded;
        // Luego, puedes usar 'path' en tu función set
        set(ref(db, path), {
          nombre: uname,
          email: uemail,
          key: uid,
          idrol: 4,
          idnivel: 2
        });
      }
    });
    // ...
  }
  else {
    // User is signed out

    //Ocultamos el botón
    ////logoutButton.style.display = "none";
    //Desplegamos el botón
    login.style.display = "block";
    // ...

    //Ocultamos el texto del modal perfil
    ////logoutButton2.style.display = "none";
    //Desplegamos el texto del modal perfil
    ////login2.style.display    = "block";
    // ...    


  }
});
