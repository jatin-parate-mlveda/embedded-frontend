import React from "react";
import ReactDOM from "react-dom/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { userLoggedInFetch } from "./userLoggedInFetch";
import translations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function MyProvider({ children }) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

console.log(37, window.location.href, window.location.search);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider i18n={translations}>
        <AppBridgeProvider
          config={{
            apiKey: process.env.REACT_APP_SHOPIFY_API_KEY,
            host: new URL(window.location.href).searchParams.get("host"),
            forceRedirect: true,
          }}
        >
          <MyProvider>
            <App />
          </MyProvider>
        </AppBridgeProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
