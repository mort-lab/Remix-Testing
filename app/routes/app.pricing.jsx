import { authenticate, MONTHLY_PLAN, ANNUAL_PLAN } from "../shopify.server";
import { json } from "@remix-run/node";

import {
  getSubscriptionStatus,
  createSubscriptionMetafield,
} from "../models/Subscription.server";
import { useLoaderData, useSubmit } from "@remix-run/react";

import {
  Page,
  Layout,
  InlineGrid,
  BlockStack,
  Text,
  Card,
  List,
  InlineStack,
  Button,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  if (!admin) return null;

  const subscriptions = await getSubscriptionStatus(admin.graphql);
  const { activeSubscriptions } = subscriptions.data.app.installation;

  if (activeSubscriptions) {
    if (activeSubscriptions.status === "ACTIVE") {
      await createSubscriptionMetafield(admin.graphql, "true");
    } else {
      await createSubscriptionMetafield(admin.graphql, "false");
    }
  }

  return json({ activeSubscriptions });
};

export const action = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { shop } = session;

  const data = {
    ...Object.fromEntries(await request.formData()),
  };

  const action = data.action;
  const isTest = true;

  if (!action) {
    return null;
  }

  const PLAN = action === "monthly" ? MONTHLY_PLAN : ANNUAL_PLAN;

  if (data.cancel) {
    const billingCheck = await billing.require({
      plans: [PLAN],
      onFailure: async () => billing.request({ plan: PLAN }),
    });
    const subscription = billingCheck.appSubscriptions[0];
    await billing.cancel({
      subscriptionId: subscription.id,
      isTest: isTest,
      prorate: true,
    });
  } else {
    await billing.require({
      plans: [PLAN],
      isTest: isTest,
      onFailure: async () => billing.request({ plan: PLAN, isTest: isTest }),
      returnUrl: `https://${shop}/admin/apps/remix-testing-3/app/mysections`,
    });
  }

  return null;
};

const Pricing = () => {
  const { activeSubscriptions } = useLoaderData();
  const submit = useSubmit();
  const hasSubscription = activeSubscriptions.length == 0 ? false : true;

  const handlePurchaseAction = (subscription) => {
    submit({ action: subscription }, { method: "post" });
  };

  const handleCancelAction = (subscription) => {
    submit({ action: subscription, cancel: true }, { method: "post" });
  };
  return (
    <Page>
      <Layout.Section>
        <BlockStack gap="500">
          <Text variant="heading2xl" as="h2">
            Pricing
          </Text>
          <InlineGrid gap="400" columns={3}>
            {/* Annual Plan */}
            <Card roundedAbove="sm">
              <BlockStack gap="200">
                <Text as="h2" variant="headingLg" alignment="center">
                  Anual Plan
                </Text>
                <BlockStack gap="200">
                  <Text
                    as="h3"
                    variant="headingMd"
                    fontWeight="medium"
                    alignment="center"
                  >
                    Benefits
                  </Text>
                  <List>
                    <List>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                    </List>
                  </List>
                </BlockStack>
                <InlineStack>
                  {!hasSubscription && (
                    <Button
                      onClick={() => handlePurchaseAction("annual")}
                      variant="secondary"
                      tone="success"
                      size="large"
                      fullWidth={true}
                    >
                      Purchase Plan
                    </Button>
                  )}
                  {hasSubscription &&
                    activeSubscriptions[0].name == "Annual Subscription" && (
                      <Button
                        onClick={() => handleCancelAction("annual")}
                        variant="primary"
                        tone="critical"
                        size="large"
                        fullWidth={true}
                      >
                        Cancel Plan
                      </Button>
                    )}
                  {hasSubscription &&
                    activeSubscriptions[0].name == "Monthly Subscription" && (
                      <Button
                        onClick={() => handlePurchaseAction("annual")}
                        variant="primary"
                        tone="success"
                        size="large"
                        fullWidth={true}
                      >
                        Upgrade to Pro
                      </Button>
                    )}
                </InlineStack>
              </BlockStack>
            </Card>

            {/* Monthly Plan */}
            <Card roundedAbove="sm">
              <BlockStack gap="200">
                <Text as="h2" variant="headingLg" alignment="center">
                  Monthly Plan
                </Text>
                <BlockStack gap="200">
                  <Text
                    as="h3"
                    variant="headingMd"
                    fontWeight="medium"
                    alignment="center"
                  >
                    Benefits
                  </Text>
                  <List>
                    <List>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                    </List>
                  </List>
                </BlockStack>
                <InlineStack>
                  {!hasSubscription && (
                    <Button
                      onClick={() => handlePurchaseAction("monthly")}
                      variant="primary"
                      tone="success"
                      size="large"
                      fullWidth={true}
                    >
                      Purchase Plan
                    </Button>
                  )}
                  {hasSubscription &&
                    activeSubscriptions[0].name == "Monthly Subscription" && (
                      <Button
                        onClick={() => handleCancelAction("monthly")}
                        variant="primary"
                        tone="critical"
                        size="large"
                        fullWidth={true}
                      >
                        Cancel Plan
                      </Button>
                    )}
                  {hasSubscription &&
                    activeSubscriptions[0].name == "Annual Subscription" && (
                      <Button
                        onClick={() => handlePurchaseAction("monthly")}
                        variant="primary"
                        tone="success"
                        size="large"
                        fullWidth={true}
                      >
                        Cambiar de Plan
                      </Button>
                    )}
                </InlineStack>
              </BlockStack>
            </Card>

            {/* Individual "packs" o components */}
            <Card roundedAbove="sm">
              <BlockStack gap="200">
                <Text as="h2" variant="headingLg" alignment="center">
                  Buy One Time
                </Text>
                <BlockStack gap="200">
                  <Text
                    as="h3"
                    variant="headingMd"
                    fontWeight="medium"
                    alignment="center"
                  >
                    Benefits
                  </Text>
                  <List>
                    <List>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                      <List.Item>Premium Reusable Components</List.Item>
                    </List>
                  </List>
                </BlockStack>
                <InlineStack>
                  <Button
                    variant="secondary"
                    tone="success"
                    size="large"
                    fullWidth={true}
                    url="/app"
                  >
                    See All Components
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </InlineGrid>
        </BlockStack>
      </Layout.Section>
    </Page>
  );
};

export default Pricing;
