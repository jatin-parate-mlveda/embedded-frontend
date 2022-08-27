import { TitleBar } from "@shopify/app-bridge-react";
import { Card, TextContainer } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "./App.css";

function App() {
  const primaryAction = { content: "Foo", url: "/foo" };
  const secondaryActions = [{ content: "Bar", url: "/bar", loading: true }];
  const actionGroups = [
    { title: "Baz", actions: [{ content: "Baz", url: "/baz" }] },
  ];

  return [
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
}

export default App;
