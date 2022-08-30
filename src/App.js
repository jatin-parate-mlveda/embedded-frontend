import { Page, Card, TextContainer, Frame, Navigation } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import ShopJsonPreview from "./components/ShopJsonPreview";
import { JwtContextProvider } from "./JwtContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("jwtToken")) {
      setJwtToken(searchParams.get("jwtToken"));
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "9a70b14e-b8db-48b2-8773-95eb66b91cee";
    (function () {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
      window.$crisp.push(["set", "session:segments", [["invoicehero"]]]);
    })();
  }, [location]);

  if (location.pathname === "/auth") {
    window.location.href =
      process.env.REACT_APP_API_HOST + "/shopify-auth" + window.location.search;
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
      <Frame>
        <Navigation location={location.pathname}>
          <Navigation.Section
            items={[
              {
                label: "Home",
                onClick: () => navigate("/"),
              },
              {
                label: "About",
                onClick: () => navigate("/about"),
              },
            ]}
          />
        </Navigation>
        <Page>
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
            <Route path="" index exact element={appContent} />
            <Route path="about" element={<h1>About page</h1>} />
          </Routes>
        </Page>
      </Frame>
    </JwtContextProvider>
  );
}

export default App;
