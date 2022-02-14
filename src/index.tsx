import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./scss/Style.scss";
import { Provider } from "react-redux";
import { store } from "./store";
const setupStore = store();
ReactDOM.render(
  <StrictMode>
    <Provider store={setupStore}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
