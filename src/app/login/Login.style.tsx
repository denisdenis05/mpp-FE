// Login.style.tsx
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d9d9d9;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const LoginTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const LoginInput = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #9a8282;
    box-shadow: 0 0 0 2px rgba(154, 130, 130, 0.2);
  }
`;

const LoginButton = styled.button`
  background-color: #9a8282;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #8a7272;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 5px;
  text-align: center;
`;

export {
  LoginContainer,
  LoginForm,
  LoginInput,
  LoginButton,
  LoginTitle,
  ErrorMessage,
};
