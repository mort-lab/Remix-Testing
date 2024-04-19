import { useState } from "react";
import { Layout, LegacyCard, Text, Button, Select } from "@shopify/polaris";

const MySectionsComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("Item1");

  const handleSelectChange = (value) => setSelected(value);

  const items = [
    { label: "Item 1", value: "Item1" },
    { label: "Item 2", value: "Item2" },
    { label: "Item 3", value: "Item3" },
  ];

  return (
    <Layout>
      <Layout.Section variant="oneThird">
        <LegacyCard>
          <LegacyCard.Section>
            <Text variant="headingLg" as="h1" alignment="center">
              Header Section #1
            </Text>
          </LegacyCard.Section>
          <LegacyCard.Section>
            <img
              alt="hola"
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "10px",
              }}
              src="https://cdn.shopify.com/s/files/1/0677/0894/4618/files/Screenshot2024-04-13124013_bcacfb2f-1dc4-4ba6-871a-4d41ebcb2246.png?v=1713453675"
            />
          </LegacyCard.Section>
          <LegacyCard.Section>
            <div style={{ width: "auto" }}>
              <Select
                onClick={() => setExpanded(!expanded)}
                options={items}
                placeholder="Select a Theme"
                onChange={handleSelectChange}
                value={selected}
              />
            </div>
          </LegacyCard.Section>
        </LegacyCard>
      </Layout.Section>
    </Layout>
  );
};

export default MySectionsComponent;
