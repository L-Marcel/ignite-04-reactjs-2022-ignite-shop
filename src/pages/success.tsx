import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getSession } from "../services/stripe";
import Head from "next/head";

export type SuccessPageProps = {
  customerName: string;
  product: {
    imageUrl: string;
    name: string;
  }
};

export default function SuccessPage({
  customerName,
  product: {
    imageUrl,
    name
  }
}: SuccessPageProps) {
  return (
    <>
      <Head>
        <title>Ignite Shop | Success</title>
        <meta name="description" content="Sua simulação de compra foi realizada com sucesso!"/>
        <meta name="author" content="L-Marcel"/>
        <meta name="robots" content="noindex"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image
            src={imageUrl}
            alt=""
            className="object-cover"
            width={120}
            height={110}
          />
        </ImageContainer>

        <p>Uhuul <strong>{customerName}</strong>, sua <strong>{name}</strong> já está a caminho da sua casa. </p>
      
        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
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
    const { customerName, product } = await getSession(String(session_id));

    return {
      props: {
        customerName,
        product
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};