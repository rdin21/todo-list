import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { LOGIN_ROUTE } from "./routes/pathRoutes";
import { check } from "./service/userService";
import AppRoutes from "../src/routes/AppRoutes";

function App(): JSX.Element | null {
  const [auth, setAuth] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    dispatch(check()).then(() => setAuth(true));
    if (!token) {
      navigation(LOGIN_ROUTE);
    }
  }, []);
  return auth ? <AppRoutes /> : null;
}

export default App;
