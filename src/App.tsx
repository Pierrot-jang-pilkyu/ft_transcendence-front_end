import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useState, createContext, useEffect } from "react";
import AfterLogin from "./pages/AfterLogin";
export const LoginContext = createContext();
import { Cookies } from "react-cookie";
import axios from "axios";
import Loading from "./pages/Loading/Loading";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

// Socket connet
//HERE
function App() {
  const [login, setLogin] = useState<boolean | undefined>();
  const [ifLoginPage, setIfLoginPage] = useState<React.ReactNode | null>(<Loading/>);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3000/auth/login")
      .then(() => {
        setLogin(true);
      })
      .catch((error) => {
        setLogin(false);
      });
  }, []);

  useEffect(() => {
    if (login== undefined) 
      setIfLoginPage(<Loading/>)
    else if (login == false)
      setIfLoginPage(<Home/>);
    else
      setIfLoginPage(<AfterLogin />);
  }, [login]);

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Noto+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />
      <LoginContext.Provider value={[login, setLogin] as any}>
        <BrowserRouter>{ifLoginPage}</BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
