import { getProduct } from "../../../src/services/stripe";

interface ProductPageHeadProps {
  params: {
    id: string;
  }
}

export default async function ProductHead({ params: { 
  id
}}: ProductPageHeadProps) {
  const { name, description } = await getProduct(id);

  return (
    <>
      <title>{`Ignite Shop | ${name}`}</title>
      <meta name="description" content={description || ""}/>
      <meta name="author" content="L-Marcel"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </>
  );
}