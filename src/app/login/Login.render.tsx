import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import {
  LoginContainer,
  LoginForm,
  LoginInput,
  LoginButton,
  LoginTitle,
  ErrorMessage,
} from "./Login.style";
import { useData } from "@/DataContext";

const Login = () => {
  const [auth2fa, setAuth2fa] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [is2FASuccessfullyEnabled, setis2FASuccessfullyEnabled] =
    useState(false);
  const [qrCode, setQrCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToken, addUsername, getUsername } = useData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/Auth/login",
        {
          username,
          password,
        }
      );

      if (response.data) {
        if (response.data.username) {
          addUsername(response.data.username);

          const response2 = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/Auth/is-2fa-enabled",
            { username }
          );

          if (response2.data.result == false) {
            const response3 = await axios.post(
              process.env.NEXT_PUBLIC_API_URL + "/Auth/get-qr-code",
              { username }
            );

            setQrCode(response3.data);
          }

          setIs2faEnabled(response2.data.result);
          setis2FASuccessfullyEnabled(response2.data.result);

          setAuth2fa(true);
        }
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Invalid username or password");
      } else if (err.request) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanQR = async (e: React.FormEvent) => {
    e.preventDefault();

    setIs2faEnabled(true);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (is2FASuccessfullyEnabled == false) {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/Auth/enable-2fa",
        { username, code }
      );

      if (response.data == false) return;

      console.log(response.data);
    }

    try {
      const response2 = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/Auth/validate-2fa",
        { username, code }
      );

      console.log(response2.data);
      addToken(response2.data);
      router.push("/home");
    } catch {
      setError("Invalid 2fa code");
    }
  };

  return (
    <LoginContainer>
      {(!auth2fa && (
        <LoginForm onSubmit={handleLogin}>
          <LoginTitle>Login</LoginTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <LoginInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>
        </LoginForm>
      )) ||
        (is2faEnabled && (
          <LoginForm onSubmit={handleSendCode}>
            <LoginTitle>2FA</LoginTitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <LoginInput
              type="text"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <LoginButton type="submit">Send</LoginButton>
          </LoginForm>
        )) || (
          <LoginForm onSubmit={handleScanQR}>
            <LoginTitle>Scan the qr code in your authenticator app</LoginTitle>
            <QRCodeSVG value={qrCode} size={200} />
            <LoginButton type="submit">Done</LoginButton>
          </LoginForm>
        )}
    </LoginContainer>
  );
};

export default Login;
