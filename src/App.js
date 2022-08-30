import { Card, TextContainer } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ShopJsonPreview from "./components/ShopJsonPreview";
import { JwtContextProvider } from "./JwtContext";

function App() {
  const location = useLocation();
  const [jwtToken, setJwtToken] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("jwtToken")) {
      setJwtToken(searchParams.get("jwtToken"));
    }
  }, [location]);

  if (location.pathname === "/auth") {
    window.location.href =
      process.env.REACT_APP_API_HOST + "/shopify-auth/callback" + window.location.search;
    return null;
  }

  console.log(7, window.location.href, window.location.search);

  const appContent = [
    <Card key="card" title="Product Counter" sectioned>
      <TextContainer spacing="loose">
        <p>
          Sample products are created with a default title and price. You can
          remove them at any time.
        </p>
      </TextContainer>
    </Card>,
    <ShopJsonPreview />,
  ];

  return (
    <JwtContextProvider value={jwtToken}>
      <Routes>
        <Route
          path="/auth"
          exact
          element={() => {
            console.log(28, "matched");
            return (window.location.href =
              process.env.REACT_APP_API_HOST +
              "/shopify-auth" +
              window.location.search);
          }}
        ></Route>
        <Route path="*" element={appContent} />
      </Routes>
    </JwtContextProvider>
  );
}

export default App;
