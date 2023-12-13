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

export async function fetchWooCommerceProductsByCategorySlug(categorySlug: string) {
    try {
        // Eerst de categoriegegevens ophalen op basis van de slug
        const categoryResponse = await api.get(`products/categories?slug=${categorySlug}`);

        if (categoryResponse.data.length === 0) {
            throw new Error(`Categorie met slug ${categorySlug} niet gevonden.`);
        }

        // Vervolgens de producten ophalen die aan deze categorie zijn gekoppeld
        const categoryId = categoryResponse.data[0].id;
        const productsResponse = await api.get(`products?category=${categoryId}`);

        return productsResponse.data;

    } catch (error) {
        throw new Error(`Fout bij het ophalen van producten voor categorie met slug ${categorySlug}`);
    }
}


