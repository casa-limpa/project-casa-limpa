import { useState } from "react";
import firebase from "./firebase";

export async function cadastraUser(
  nome,
  email,
  endereco,
  celular,
  tipo,
  uid,
  autorizado
) {
  console.log("Chamou a função");

  return await firebase
      .database()
      .ref("User/" + uid)
      .set({
        nome,
        email,
        endereco,
        celular,
        tipo,
        autorizado,
      });
}


export async function DeletUsers(id) {
  return await firebase
    .database()
    .ref("User/" + id)
    .remove();
}

export async function UpdateUser(id, autorizacaoDoUsuario) {
  return await firebase
    .database()
    .ref("User")
    .child(`${id}`)
    .update({
      autorizado: autorizacaoDoUsuario,
    });
}

export async function LogIn(email, password) {
  return await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
      window.localStorage.setItem("Auth", JSON.stringify(response));
      // alert("Deslogado com sucesso!");
      window.location.reload();
    })
    .catch((err) => {
      return err;
    });
}

export async function ForgotPassword(email) {
  return await firebase.auth().sendPasswordResetEmail(email);
}

export async function logOut() {
  await firebase
    .auth()
    .signOut()
    .then((response) => {
      console.log(response);
      window.localStorage.setItem("Auth", null);
      // alert("Deslogado com sucesso!");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      alert("Ops...");
    });
}

export function auth() {
  firebase.auth().onAuthStateChanged((user) => {
    window.localStorage.setItem("Auth", JSON.stringify(user));
  });
}
