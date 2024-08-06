import { fetchWooCommerceProducts } from "@/utils/wooCommerceApi";
import { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const basePath = `https://trendyleds.nl`;

    try {

        const products = await fetchWooCommerceProducts();

        const productArray = products.data;

        const lastModified = new Date();

        const productEntries = productArray.map((product: any) => ({
            url: `${basePath}/${product.slug}/`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.8,
        }));





        return [
            {
                url: basePath,
                lastModified,
                changeFrequency: 'weekly',
                priority: 1,
            },
            {
                url: `${basePath}/blog/`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.7,
            },
            {
                url: `${basePath}/levertijd/`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.5,
            },
            {
                url: `${basePath}/installatiegids/`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.5,
            },
            {
                url: `${basePath}/over-ons/`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.5,
            },

            ...productEntries
        ];
    } catch (error) {
        console.error('Error while generating sitemap:', error);
        throw error;
    }
}
