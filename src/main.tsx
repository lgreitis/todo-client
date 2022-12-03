import NiceModal from "@ebay/nice-modal-react";
import { css, Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store";

// axios.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const {
//       auth: { token },
//     }: RootState = store.getState();

//     // TODO: check if this doesn't break stuff
//     if (!config.headers) {
//       return config;
//     }

//     config.headers.Authorization = `Bearer ${token}`;

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Global
        styles={css`
          :root {
            --page-nav-height: 64px;
          }
        `}
      />
      <NiceModal.Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NiceModal.Provider>
    </Provider>
  </React.StrictMode>
);
