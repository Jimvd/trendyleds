import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: "https://www.jpcms.nl/",
  consumerKey: process.env.WOOCOMMERCE_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_SECRET!,
  version: "wc/v3",
});

// fetch all products from WooCommerce //
export async function fetchWooCommerceProducts() {
  try {
    const response = await api.get("products");
    return response;
  } catch (error) {
    throw new Error(`Fout bij het ophalen van producten: `);
  }
}

// Fetch a single product by slug
export async function fetchWooCommerceProductBySlug(productSlug: string) {
  try {
    const response = await api.get(`products?slug=${productSlug}`);
    const product = response.data.length ? response.data[0] : null;

    if (product && product.cross_sell_ids.length > 0) {
      const relatedProductsResponse = await api.get(
        `products?include=${product.cross_sell_ids.join(",")}`
      );
      product.cross_sell_ids = relatedProductsResponse.data;
    }

    return product;
  } catch (error) {
    throw new Error(`Error fetching product with slug ${productSlug}`);
  }
}

export async function fetchWooCommerceProductsByCategorySlug(
  categorySlug: string
) {
  try {
    const categoryResponse = await api.get(
      `products/categories?slug=${categorySlug}`
    );

    if (categoryResponse.data.length === 0) {
      throw new Error(`Categorie met slug ${categorySlug} niet gevonden.`);
    }

    const categoryId = categoryResponse.data[0].id;
    const productsResponse = await api.get(`products?category=${categoryId}`);

    return productsResponse.data;
  } catch (error) {
    throw new Error(
      `Fout bij het ophalen van producten voor categorie met slug ${categorySlug}`
    );
  }
}


export async function fetchWooCommerceProductCategoryById(categoryId: number) {
  try {
    const response = await api.get(`products/categories/${categoryId}`);

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching category with ID ${categoryId}: ${error}`);
  }
}

