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
        // Assuming the product is in the first position of the 'data' array
        return response.data.length ? response.data[0] : null;
    } catch (error) {
        throw new Error(`Error fetching product with slug `);
    }
}