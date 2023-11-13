import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
    url: "https://www.trendyleds.nl/",
    consumerKey: process.env.WOOCOMMERCE_KEY!,
    consumerSecret: process.env.WOOCOMMERCE_SECRET!,
    version: "wc/v3",
});

// fetch all products from WooCommerce //
export async function fetchWooCommerceProducts() {
    try {
        const response = await api.get("products");
        console.log(response);
        return response;
    } catch (error) {

    }
}