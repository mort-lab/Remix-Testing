// app/components/MediaCard.tsx
import {
  MediaCard,
  Modal,
  InlineGrid,
  Card,
  Text,
  Button,
  BlockStack,
  Tag,
  Badge,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { PlusIcon, CartFilledIcon, ViewIcon } from "@shopify/polaris-icons";

export function MediaCardExample({ product, admin }) {
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = useCallback(
    () => setModalActive((active) => !active),
    [],
  );

  return (
    <>
      <MediaCard
        style={{ height: "100%" }}
        title={product.title}
        size="small"
        portrait={true}
        primaryAction={{
          fullWidth: true,
          content: "View Details",
          onAction: toggleModal,
        }}
        secondaryAction={{
          content: "See Live",
        }}
        description={product.description}
      >
        <div style={{ position: "relative" }}>
          <img
            alt={product.title}
            width="100%"
            height="100%"
            style={{ objectFit: "cover", objectPosition: "center" }}
            src={product.imageSrc}
          />
          <div
            style={{
              position: "absolute",
              top: 0, // adjust as needed
              right: 0, // adjust as needed
              display: "flex",
              gap: "var(--p-space-200)",
              flexDirection: "column", // stack them vertically, or use "row" to stack horizontally
              padding: "var(--p-space-200)",
            }}
          >
            {product.tags.map((tag) => {
              if (tag === "premium") {
                return (
                  <Badge key={tag} tone="info">
                    Premium
                  </Badge>
                );
              } else if (tag === "free") {
                return (
                  <Badge key={tag} tone="success">
                    Free
                  </Badge>
                );
              } else {
                return <Tag key={tag}>{tag}</Tag>; // Para cualquier otro tag que no sea 'free' o 'premium'
              }
            })}
          </div>
        </div>
      </MediaCard>

      <Modal
        size="large"
        open={modalActive}
        onClose={toggleModal}
        title={product.title}
        primaryAction={{
          content: "Close",
          onAction: toggleModal,
        }}
        secondaryActions={[
          {
            content: "See All Plans",
            url: "/app/pricing",
          },
        ]}
      >
        <Modal.Section>
          <InlineGrid columns={["oneThird", "twoThirds"]} gap="400">
            <div>
              <BlockStack gap="300">
                <Card>
                  <BlockStack gap="300">
                    <Text as="h1" variant="headingMd">
                      {product.title}
                    </Text>
                    <div style={{ display: "flex", gap: "var(--p-space-200)" }}>
                      {product.tags.map((tag) => {
                        if (tag === "premium") {
                          return (
                            <Badge key={tag} tone="info">
                              Premium
                            </Badge>
                          );
                        } else if (tag === "free") {
                          return (
                            <Badge key={tag} tone="success">
                              Free
                            </Badge>
                          );
                        } else {
                          return <Tag key={tag}>{tag}</Tag>; // Para cualquier otro tag que no sea 'free' o 'premium'
                        }
                      })}
                    </div>
                    <Text as="h5">{product.description}</Text>
                    <Button
                      variant="primary"
                      tone="success"
                      size="large"
                      fullWidth={true}
                      icon={CartFilledIcon}
                      onClick={() =>
                        console.log(`Se intenta comprar: ${product.id}`)
                      }
                    >
                      Buy Unique Component
                    </Button>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="300">
                    <Button
                      variant="secondary"
                      size="large"
                      fullWidth={true}
                      icon={ViewIcon}
                    >
                      See Live
                    </Button>
                    <Button
                      size="large"
                      fullWidth={true}
                      variant="primary"
                      url="/app/pricing"
                    >
                      Buy Premium Membership
                    </Button>

                    {/* This button is only rendered if the associated product is purchased. */}
                    <Button
                      size="large"
                      fullWidth={true}
                      icon={PlusIcon}
                      url="/app/mysections"
                    >
                      Add To theme
                    </Button>
                  </BlockStack>
                </Card>
              </BlockStack>
            </div>
            <Card>
              {product.imageSrc && (
                <img
                  src={product.imageSrc}
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />
              )}
            </Card>
          </InlineGrid>
        </Modal.Section>
      </Modal>
    </>
  );
}
