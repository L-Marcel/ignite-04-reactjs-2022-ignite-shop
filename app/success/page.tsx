import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../../src/styles/pages/success";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getSession } from "../../src/services/stripe";

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
  const { customerName, product } = await getSession(session_id)
    .then(res => res)
    .catch(() => notFound());

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