import Image from "next/image";
import { IconButton } from "../IconButton";
import logoImg from "../../assets/Logo.svg";
import { HeaderContainer } from "./styles";
import { CartAmount } from "../CartAmount";
import { useProducts } from "../../context/hooks/useProducts";
import * as Dialog from "@radix-ui/react-dialog";
import { Drawer } from "../Drawer/index";
import { useState } from "react";
import { useRouter } from "next/router";

export function Header() {
  const { asPath } = useRouter();
  const needToUseAltHeader = asPath.startsWith("/success");

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { productsAmount } = useProducts();

  function handleOnOpenDrawer() {
    setDrawerIsOpen(true);
  }

  function handleOnCloseDrawer() {
    setDrawerIsOpen(false);
  }

  return (
    <Dialog.Root open={drawerIsOpen}>
      <Drawer onClose={handleOnCloseDrawer}/>
      <HeaderContainer mode={needToUseAltHeader? "alt":"normal"}>
        <Image
          src={logoImg}
          alt=""
          width={130}
          height={52}
        />

        {
          !needToUseAltHeader && 
            <IconButton
              onClick={handleOnOpenDrawer}
              icon="Handbag"
              size="small"
              iconProps={{
                weight: "bold",
              }}
            >
              <CartAmount
                amount={productsAmount}
              />
            </IconButton>
        }
      </HeaderContainer>
    </Dialog.Root>
  );
}