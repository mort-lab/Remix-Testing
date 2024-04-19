import {
  LegacyCard,
  Page,
  Text,
  Layout,
  BlockStack,
  InlineGrid,
  EmptyState,
  Link,
} from "@shopify/polaris";
import React from "react";
import MySectionsComponent from "../components/MySectionsComponent";

const MySections = () => {
  return (
    <Page>
      <Layout.Section>
        <BlockStack gap="500">
          <Text variant="heading2xl" as="h2">
            My Sections
          </Text>
          <LegacyCard sectioned>
            {/* <EmptyState
              heading="Here all the products you have purchased will be displayed."
              action={{ content: "See All Components", url: "/app" }}
              footerContent={
                <p>
                  If you want access to all premium components, you can purchase
                  your subscription at{" "}
                  <Link monochrome url="/app/pricing">
                    Pricing
                  </Link>
                  .
                </p>
              }
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            ></EmptyState> */}
            <BlockStack gap="400">
              <InlineGrid gap="400" columns={4}>
                <MySectionsComponent />
                <MySectionsComponent />
                <MySectionsComponent />
                <MySectionsComponent />
                <MySectionsComponent />
              </InlineGrid>
            </BlockStack>
          </LegacyCard>
        </BlockStack>
      </Layout.Section>
    </Page>
  );
};

export default MySections;
