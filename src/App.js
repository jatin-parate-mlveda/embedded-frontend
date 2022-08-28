import { TitleBar } from "@shopify/app-bridge-react";
import { Card, TextContainer } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const primaryAction = { content: "Foo", url: "/foo" };
  const secondaryActions = [{ content: "Bar", url: "/bar", loading: true }];
  const actionGroups = [
    { title: "Baz", actions: [{ content: "Baz", url: "/baz" }] },
  ];

  const appContent = [
    <TitleBar
      key="titleBar"
      title="Hello world!"
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      actionGroups={actionGroups}
    />,
    <Card key="card" title="Product Counter" sectioned>
      <TextContainer spacing="loose">
        <p>
          Sample products are created with a default title and price. You can
          remove them at any time.
        </p>
      </TextContainer>
    </Card>,
  ];

  return (
    <Routes>
      <Route path='/auth' element={() => window.location.href = process.env.REACT_APP_API_HOST + '/shopify/auth' + window.location.search}></Route>
      <Route path='*' element={appContent} />
    </Routes>
  )
}

export default App;
