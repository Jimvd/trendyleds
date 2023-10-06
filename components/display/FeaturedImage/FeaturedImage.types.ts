export type FeaturedImageProps = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    categories: {
        nodes: Array<{
            slug: string;
            name: string;
        }>;
    };
    featuredImage?: {
        node: {
            mediaDetails?: {
                sizes?: {
                    sourceUrl: string;
                    width: number;
                    height: number;
                }[];
            };
        };
    };
}