import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../src/routes/AppRoutes";
import { useAppDispatch } from "./hooks/redux";
import { LOGIN_ROUTE } from "./routes/pathRoutes";
import { check } from "./service/userService";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    dispatch(check());
    if (!token) {
      navigation(LOGIN_ROUTE);
    }
  }, []);
  return <AppRoutes />;
}

export default App;
