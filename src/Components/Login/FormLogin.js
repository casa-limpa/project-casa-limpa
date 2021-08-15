import styled from "styled-components";

export const FormLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  background-color: #ffffff;
  max-width: 400px;
  position: relative;
  border-radius: 20px;
  width: 80%;
`;
export const FormLoginLogo = styled.div`
  position: absolute;
  top: -30px;

  img{
    width: 64px;
    height: 64px;
    border-radius: 200%;
  }
`;
export const FormLoginTitleHeader = styled.div`
  width: 100%;
  text-align: center;

  h1 {
    font-weight: 600;
    color: #303e67;
    font-size: 2.2rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
    line-height: 22px;
  }
  p {
    color: #a4abc5;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 1.6;
    font-family: "Roboto", sans-serif;
    font-size: 0.845rem;
    font-weight: 400;
  }
`;
export const FormLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;
export const FormLoginInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;

  label {
    font-weight: 400;
    color: #656d9a;
    font-size: 13px;
    padding-bottom: 0.548rem;
  }
  input {
    margin-bottom: 1rem;
    border-radius: 30px;
    padding-right: 40px;
    padding: 0.375rem 0.75rem;
    font-size: 0.845rem;
    line-height: 1.4;
    color: #303e67;
    background-color: #fff;
    border: 1px solid #e8ebf3;
  }
`;
export const FormLoginRememberAndForgot = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  margin-bottom: 1.8rem;
  font-size: 0.845rem;
  color: #303e67;
  letter-spacing: 0.1px;
  line-height: 1.5;
  label,
  input, a {
    cursor: pointer;
  }
`;
export const FormLoginButton = styled.button`
  width: 100%;
  background: linear-gradient(14deg, #1761fd 0%, rgba(23, 97, 253, 0.6));
  color: #ffffff;
  border: none;
  text-align: center;
  justify-content: center;
  align-items: center;
  box-shadow: 0 7px 14px 0 rgb(23 97 253 / 50%);
  border-radius: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 0.845rem;
  margin-bottom: 2rem;
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 0;
  }
`;
export const FormLoginRegisterButton = styled.button`
  width: 100%;
  background: linear-gradient(14deg, #cccccc 0%, rgb(103 103 103 / 60%));
  color: #ffffff;
  border: none;
  text-align: center;
  justify-content: center;
  align-items: center;
  box-shadow: 0 7px 14px 0 rgb(0 0 0 / 50%);
  border-radius: 30px;
  padding: 0.375rem 0.75rem;
  font-size: 0.845rem;
  margin-bottom: 2rem;
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 0;
  }
`;

export const FormLoginDontHaveAccount = styled.span`
  width: 100%;
  text-align: center;
  line-height: 1.6;
  font-family: "Roboto", sans-serif;
  font-size: 0.845rem;
  margin-bottom: 1rem;
  color: #a4abc5;
  a {
    padding-left: 2rem;
    color: blue;
  }
`;
