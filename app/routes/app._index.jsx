import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Text, BlockStack, InlineGrid } from "@shopify/polaris";
import { apiVersion, authenticate } from "../shopify.server";
import { MediaCardExample } from "../components/MediaCardExample";

export const query = `
{
  products(first: 6) {
    edges {
      node {
        id
        handle
        title
        description
        tags
        images(first: 1) {
          edges {
            node {
              src
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}

`;

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Access-Token": accessToken,
        },
        body: query,
      },
    );

    if (response.ok) {
      const data = await response.json();

      const {
        data: {
          products: { edges },
        },
      } = data;
      return edges;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};

export default function Index() {
  const products = useLoaderData();

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Text variant="heading2xl" as="h2">
              Product Sections
            </Text>
            <InlineGrid gap="400" columns={4}>
              {products.map((edge) => {
                const product = edge.node;
                // Accede a la primera imagen de cada producto.
                const imageSrc = product.images.edges[0]?.node.src;
                return (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "stretch",
                    }}
                  >
                    <MediaCardExample
                      product={{
                        title: product.title,
                        description: product.description,
                        imageSrc, // Usa la URL de la imagen aquí.
                        tags: product.tags,
                      }}
                    />
                  </div>
                );
              })}
            </InlineGrid>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
