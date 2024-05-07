import axios from 'axios';

export default async function handler(req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): void; new(): any; }; }; }) {
   try {
      const response = await axios.post("https://jpcms.nl/wp-json/wc/v3/orders", req.body, {
         auth: {
            username: process.env.WOOCOMMERCE_KEY!,
            password: process.env.WOOCOMMERCE_SECRET!,
         },
      });
      res.status(200).json(response.data);
   } catch (error) {
      console.error("Error creating order:", error);

   }
}
