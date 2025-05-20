import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@nextui-org/react";
import Button from "../../../components/input/Button";
import { updateCartMutation } from "../storefront/updateCart";
import { execute } from "../../../graphql/execute";
import NavLink from "../../../components/input/NavLink";
import { useCart } from "../store/useCart";

interface CartProps {
  isMobile?: boolean;
}

export default function Cart({ isMobile = false }: CartProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const query = useCart();

  if (query.isLoading) return null;
  if (query.error || !query.data) {
    console.error(query.error);
    return "Error fetching cart";
  };

  if (query.data) {
    const cart = query.data;
    const items = cart?.lines.edges;

    const handleUpdateCart = async (itemId: string, quantity: number) => {
      if (!cart || !items) return;

      const updatedItems = items.map((item) => {
        if (item.node.id === itemId) {
          return {
            ...item,
            node: {
              ...item.node,
              quantity,
            },
          };
        }
        return item;
      });

      const res = await execute(updateCartMutation, {
        cartId: cart!.id,
        lines: updatedItems.map((item) => ({
          id: item.node.id,
          quantity: item.node.quantity,
        })),
      });

      if (res.cartLinesUpdate?.userErrors && res.cartLinesUpdate.userErrors.length > 0) {
        console.error(res.cartLinesUpdate.userErrors);
        return;
      }
      query.refetch();
    }

    return (
      <div onClick={onOpen} className="cursor-pointer">
        <div className="items-baseline">
          {isMobile ? (
            <>cart</>
          ) : (
            <>
              cart{" "}
              <sup className="text-[0.8em] left-[-3px]">
                {(items &&
                  items
                    .filter((item) => item.node.quantity > 0)
                    .map((item) => item.node.quantity)
                    .reduce((a, b) => a + b, 0)) ||
                  ""}
              </sup>
            </>
          )}
        </div>
        <Drawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-dark text-light"
          title="cart"
          backdrop="opaque"
          size="lg"
          placement="right"
          motionProps={{
            initial: { x: "100%", opacity: 0 },
            animate: { x: 0, opacity: 100 },
            exit: { x: "100%", opacity: 0 },
            transition: {
              duration: 0.5,
              ease: [0.25, 0.8, 0.25, 1],
            },
          }}
        >
          <DrawerContent>
            {(onclose) => {
              return (
                <>
                  <DrawerHeader
                    className="flex flex-col text-6xl mt-28 gap-1 px-[6%] py-0 leading-[.7]"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    cart
                  </DrawerHeader>
                  <DrawerBody
                    className="flex flex-col gap-y-4 px-[6%] py-12"
                    style={{
                      fontFamily: "Hanken Grotesk",
                    }}
                  >
                    {items &&
                      items.map(
                        (item) =>
                          item.node.quantity && (
                            <div
                              key={item.node.id}
                              className="flex flex-row gap-x-6 items-start"
                            >
                              <div className="flex relative w-48 h-auto aspect-square">
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    boxShadow:
                                      "inset 0px 0px 8px rgba(0, 0, 0, .6)",
                                    pointerEvents: "none",
                                  }}
                                  className="z-10"
                                ></div>
                                <img
                                  src={
                                    item.node.merchandise.product.featuredImage
                                      ?.url
                                  }
                                  className="w-full object-cover z-0"
                                />
                              </div>
                              <div className="flex flex-col w-full gap-y-3">
                                {/* Title + Price */}
                                <div className="flex flex-col gap-y-1">
                                  <div className="flex flex-row gap-x-4 text-xl w-full justify-between">
                                    <p
                                      style={{ fontFamily: "Inter" }}
                                      className="uppercase"
                                    >
                                      {item.node.merchandise.product.title}
                                    </p>

                                    <p style={{ fontFamily: "Inter" }}>
                                      {Number(
                                        item.node.merchandise.price.amount
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                  <span
                                    className="text-[18px]"
                                    style={{ fontFamily: "Hanken Grotesk" }}
                                  >
                                    {item.node.merchandise.title}
                                  </span>
                                </div>
                                <span className="flex flex-row gap-x-3 border-1 border-light w-fit py-1 px-3 text-[16px]">
                                  <button
                                    onClick={() =>
                                      handleUpdateCart(
                                        item.node.id,
                                        item.node.quantity + 1
                                      )
                                    }
                                  >
                                    {" "}
                                    +{" "}
                                  </button>
                                  <span>{item.node.quantity}</span>
                                  <button
                                    onClick={() =>
                                      handleUpdateCart(
                                        item.node.id,
                                        item.node.quantity - 1
                                      )
                                    }
                                  >
                                    {" "}
                                    -{" "}
                                  </button>
                                </span>
                              </div>
                            </div>
                          )
                      )}
                  </DrawerBody>
                  <DrawerFooter className="px-[6%] py-0 mb-12 justify-start">
                    {cart?.cost.checkoutChargeAmount.amount > 0 ? (
                      <div className="flex flex-col w-full justify-start gap-4 text-xl">
                        <p
                          style={{
                            fontFamily: "Inter",
                          }}
                        >
                          {" "}
                          Subtotal: $
                          {Number(
                            cart?.cost.checkoutChargeAmount.amount || 0
                          ).toFixed(2)}
                        </p>
                        <a href={cart?.checkoutUrl} className="flex w-full">
                          <Button className="w-full">Checkout</Button>
                        </a>
                      </div>
                    ) : (
                      <p
                        style={{
                          fontFamily: "Hanken Grotesk",
                        }}
                        className="text-xl"
                      >
                        cart is empty
                      </p>
                    )}
                  </DrawerFooter>
                </>
              );
            }}
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}
