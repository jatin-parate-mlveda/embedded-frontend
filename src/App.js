import { Card, TextContainer } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  console.log(7, window.location.href, window.location.search);
  const appContent = (
    <Card key="card" title="Product Counter" sectioned>
      <TextContainer spacing="loose">
        <p>
          Sample products are created with a default title and price. You can
          remove them at any time.
        </p>
      </TextContainer>
    </Card>
  );

  return (
    <Routes>
      <Route
        path="/auth"
        exact
        element={() =>
          (window.location.href =
            process.env.REACT_APP_API_HOST +
            "/shopify/auth" +
            window.location.search)
        }
      ></Route>
      <Route path="*" element={appContent} />
    </Routes>
  );
}

export default App;
