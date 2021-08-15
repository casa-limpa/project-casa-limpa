import React, { useState } from "react";
import {
  FormLoginContainer,
  FormLoginLogo,
  FormLoginTitleHeader,
  FormLoginForm,
  FormLoginInput,
  FormLoginRememberAndForgot,
  FormLoginButton,
  FormLoginDontHaveAccount,
  FormLoginRegisterButton,
} from "./FormLogin";
import { LogIn, ForgotPassword } from "../../Service/api";
import Swal from "sweetalert2";
import Logo from "../../assets/icons/Icon-min.png";

function FormLogin() {
  const [forgot, setForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueEmail, setValeuEmail] = useState('');

  const forgotPassword = () => {

    setLoading(true);

    ForgotPassword(valueEmail)
      .then((response) => {
      Swal.fire({
            icon: "success",
            title: "Email enviado com sucesso!",
            text: "Acesse o link enviado em seu e-mail para alterar sua senha",
          });
          setLoading(false);
          setForgot(false)
      })
      .catch((err) => {

        switch (err.code) {
          case 'auth/user-not-found':

            Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Parece que esse usuario nao existe, revise os campos",
          });
          setLoading(false);
            
            break;

            case 'auth/invalid-email':

            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Digite um e-mail válido",
          });
          setLoading(false);
            
            break;
        
          default:

            Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Tivemos um problema com o servidor, tente mais tarde",
          });
          setLoading(false);
            break;
        }
        
      })


  }

  const log = (e) => {
    setLoading(true);
    e.preventDefault();


    const email = e.target.username.value;
    const pass = e.target.password.value;

    if (email !== "" && pass !== "") {
      LogIn(email, pass)
        .then(async (response) => {
          if (response.code === "auth/invalid-email") {
          await  Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "Email nao cadastrado",
            });
            setLoading(false);
          }
          if (response.code === "auth/wrong-password") {
           await Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "Senha inválida",
            });
            setLoading(false);
          }
          window.location = "/";
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.data.code);
          setLoading(false);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Revise todos os campos",
      });
      setLoading(false);
    }
  };

  return (
    <FormLoginContainer>
      <FormLoginLogo>
        <img src={Logo} alt="Logo da empresa" />
      </FormLoginLogo>

      <FormLoginTitleHeader>
        <h1>Casa Limpa</h1>
        <p>Acesse a plataforma</p>
      </FormLoginTitleHeader>

      <FormLoginForm onSubmit={(e) => log(e)}>

        {forgot === true ?

          <FormLoginInput>
            <label>Email</label>
            <input type="text" placeholder="Enter username" id="username" onChange={(e) => setValeuEmail(e.target.value)} />
          </FormLoginInput>

          :
          <>
            <FormLoginInput>
              <label>Username</label>
              <input type="text" placeholder="Enter username" id="username" />
            </FormLoginInput>

            <FormLoginInput>
              <label>password</label>
              <input type="password" placeholder="Enter password" id="password" />
            </FormLoginInput>
          </>
        }




        <FormLoginRememberAndForgot>
          {/* <label>
            <input
              type="checkbox"
              id="remember"
              onClick={() => setRemember(!rembember)}
            />
            Remember me
          </label> */}

          {forgot == true ? <a onClick={() => setForgot(false)}>Voltar</a> : <a onClick={() => setForgot(true)}>Esqueci a senha</a>}


        </FormLoginRememberAndForgot>

        {forgot == true ?
          <FormLoginButton type="button" onClick={(e) => forgotPassword(e)}>
            {loading ? "Carregando....." : "Alterar senha"}
          </FormLoginButton>
          :
          <FormLoginButton type="submit" >
            {loading ? "Carregando....." : "Log in"}
          </FormLoginButton>
        }


      </FormLoginForm>

      {/* <FormLoginRegisterButton onClick={() => alert("Register")}>
        Registrar
      </FormLoginRegisterButton> */}

      {/* <FormLoginDontHaveAccount>
        Don't have an account ? <a>Free Register</a>
      </FormLoginDontHaveAccount> */}
    </FormLoginContainer>
  );
}

export default FormLogin;
