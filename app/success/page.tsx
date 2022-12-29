import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../../src/styles/pages/success";
import { stripe } from "../../src/services/stripe";
import Stripe from "stripe";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

type SessionType = {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
};

async function getSession(id: string): Promise<SessionType> {
  const response = await stripe.checkout.sessions.retrieve(id, {
    expand: ["line_items", "line_items.data.price.product"]
  });

  const customerName = response.customer_details?.name as string;
  const product = response.line_items?.data[0].price?.product as Stripe.Product;

  return {
    customerName,
    product: {
      imageUrl: product.images[0],
      name: product.name
    }
  };
}

interface SuccessPageProps {
  searchParams: {
    session_id: string;
  }
}

export default async function SuccessPage({
  searchParams: {
    session_id
  }
}: SuccessPageProps) {
  if(!session_id) {
    redirect("/");
  }

  const { customerName, product } = await getSession(session_id)
    .then(res => res)
    .catch(res => notFound());

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt=""
          className="object-cover"
          width={120}
          height={110}
        />
      </ImageContainer>

      <p>Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa. </p>
    
      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  );
}

/*<Image
          src=""
          alt=""
          className="object-cover"
        />*/