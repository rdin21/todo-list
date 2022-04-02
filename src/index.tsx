import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./scss/Style.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
const setupStore = store();
ReactDOM.render(
  <StrictMode>
    <Provider store={setupStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
