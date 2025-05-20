import { useState } from "react";
import Button, { BUTTON_VARIANTS } from "../../../components/input/Button";
import { useStore } from "@nanostores/react";
import upsertCart from "../../cart/utils/upsertCart";
import { execute } from "../../../graphql/execute";
import { addToCartMutation } from "../../cart/storefront/addToCart";
import { cartCreateMutation } from "../../cart/storefront/createCart";
import type { ProductByHandleQuery } from "../../../graphql/storefront/graphql";
import { queryClient } from "../../cart/store/useCart";
import { ENVIRONMENT } from "../../../config/constants";

interface SizesAndBuyButtonsProps {
  sizes: NonNullable<ProductByHandleQuery["product"]>["variants"]["edges"];
  isReleased: boolean;
}

export default function SizesAndBuyButtons({ sizes, isReleased }: SizesAndBuyButtonsProps) {
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const initialCartId: string = sessionStorage.getItem("cartId") || "";

  const addToCart = async () => {
    if (activeSize === null) return;

    const cartId = (await upsertCart(initialCartId))?.id;
    if (cartId === undefined) {
      console.error("Failed to add to cart");
      alert("Failed to add to cart");
      return;
    }

    const res = await execute(addToCartMutation, {
      cartId: cartId!,
      variantId: sizes[activeSize].node.id,
    });

    if (res.cartLinesAdd?.userErrors && res.cartLinesAdd.userErrors.length > 0) {
      console.error(res.cartLinesAdd.userErrors[0].message);
      return;
    }

    queryClient.refetchQueries({ queryKey: ["cart", cartId] });

  };

  const buyNow = async () => {
    if (activeSize === null) return;

    const cartCreate = (await execute(cartCreateMutation, { input: {} }))
      .cartCreate;

    if (cartCreate?.userErrors && cartCreate.userErrors.length > 0) {
      alert(cartCreate.userErrors[0].message);
      return;
    }

    const cartId = cartCreate?.cart?.id;

    const res = await execute(addToCartMutation, {
      cartId: cartId!,
      variantId: sizes[activeSize].node.id,
    });

    if (
      res.cartLinesAdd?.userErrors &&
      res.cartLinesAdd.userErrors.length > 0
    ) {
      alert(res.cartLinesAdd?.userErrors[0].message);
      return;
    }

    window.location.href = res.cartLinesAdd?.cart?.checkoutUrl;
  };

  const splitIntoRows = (input: typeof sizes) => {
    const count = Math.ceil(sizes.length / 5);
    const groups: (typeof sizes)[] = [];

    let j = 0;
    for (let i = 0; i < count; i++) {
      groups.push([]);
      for (let k = 0; k < 5 && j < sizes.length - 1; k++) {
        groups[i].push(sizes[j]);
        j += 1;
      }
    }

    return groups;
  };

  const groups = splitIntoRows(sizes);

  return (
    <div className="flex flex-col gap-8 lg:gap-10 w-full">
      <div className="flex flex-col w-full items-center lg:items-end">
        <h4 className="text-[13px]" style={{ fontFamily: "Inter" }}>
          size
        </h4>
        <div
          style={{ fontFamily: "Inter" }}
          className="flex flex-col items-end gap-y-1 mt-2"
        >
          {groups.map((row, idx) => (
            <div key={idx} className="flex flex-row gap-x-1">
              {row.map((size, sIdx) => {
                const index = sizes.indexOf(size);
                const isAvailable = ((size.node.quantityAvailable || 0) > 0 && (isReleased || ENVIRONMENT !== "production"));
                const isSelected = activeSize === index;

                return (
                  <button
                    key={sIdx}
                    onClick={() => setActiveSize(isSelected ? null : index)}
                    style={{ fontFamily: "Inter" }}
                    className={`px-3 py-1 text-[15px] md:text-[15px] lg:text-[20px] leading-[115%] transition-colors duration-300 
                      ${isAvailable
                        ? isSelected
                          ? "bg-light text-black font-bold"
                          : "text-light font-light hover:underline"
                        : "text-gray font-light cursor-not-allowed opacity-50"
                      }`}
                    disabled={!isAvailable}
                  >
                    {size.node.title}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-1xl min-w-[250px]">
        <Button
          onClick={addToCart}
          disabled={activeSize === null}
          variant={BUTTON_VARIANTS.DARK}
        >
          add to cart
        </Button>
        <Button disabled={activeSize === null} onClick={buyNow}>
          buy now
        </Button>
      </div>
    </div>
  );
}
