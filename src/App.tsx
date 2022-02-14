import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../src/routes/AppRoutes";
import { useAppDispatch } from "./hooks/redux";
import { check } from "./service/userService";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(check());
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
