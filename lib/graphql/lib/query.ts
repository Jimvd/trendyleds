export const query: (options: {
    query: string;
    variables?: object;
    revalidate: boolean;
}) => Promise<any> = async (options) => {
    console.log(options)
    return await fetch((process.env.GRAFBASE_API_URL as string), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `${options.query}`,
            variables: { ...options.variables },
        }),
        next: {
            revalidate: 60
        }
    })
        .then((res) => res.json())
        .catch((e) => {
            throw new Error(e);
        });
};