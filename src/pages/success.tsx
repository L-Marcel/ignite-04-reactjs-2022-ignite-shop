import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getSession } from "../services/stripe";
import Head from "next/head";

export type SuccessPageProps = {
  customerName: string;
  amount: number;
  products: {
    imageUrl: string;
    name: string;
    id: string;
  }[];
};

export default function SuccessPage({
  customerName,
  amount,
  products
}: SuccessPageProps) {
  const productsAreMoreThanOne = amount > 1;
  
  return (
    <>
      <Head>
        <title>Ignite Shop | Success</title>
        <meta name="description" content="Sua simulação de compra foi realizada com sucesso!"/>
        <meta name="author" content="L-Marcel"/>
        <meta name="robots" content="noindex"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <main className="success-container">
        <div className="flex">
          {products.map(({ id, imageUrl }) => {
            return (
              <div className="success-products-image" key={id}>
                <Image
                  src={imageUrl}
                  alt=""
                  className="object-cover"
                  width={120}
                  height={110}
                />
              </div>
            );
          })}
        </div>

        <h1>Compra efetuada!</h1>

        <p>Uhuul <strong>{customerName}</strong>,
          {productsAreMoreThanOne? 
            <> suas <strong>{amount}</strong> camisetas já estão </>:
            <> sua camiseta <strong>{products[0].name}</strong> já está </>}
          a caminho da sua casa. Acho que você tem um bom gosto!</p>
        <Link className="px-2 rounded-md" href="/">
          Voltar ao catálogo
        </Link>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async({
  query
}) => {
  const { session_id } = query;

  if(!session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  try {
    const { customerName, products, amount } = await getSession(String(session_id));

    return {
      props: {
        customerName,
        products,
        amount
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};