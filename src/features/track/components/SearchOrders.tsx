import { useState } from "react";
import Button, { BUTTON_VARIANTS } from "../../../components/input/Button";
import Input from "../../../components/input/Input";
import { ROUTES } from "../../../utils/routes";

export default function SearchOrders() {
  const [orderNumber, setOrderNumber] = useState("");

  const handleSubmit = () => {
    window.location.href = `${ROUTES.TRACK}/${orderNumber}`;
  };

  return (
    <div className="flex lg:flex-row flex-col gap-6 justify-start w-full lg:min-w-[508px] text-[14px]">
      <Input
        placeholder="Enter your order number here."
        onChange={(e) => setOrderNumber(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        variant={BUTTON_VARIANTS.LIGHT}
        fontFamily="Inter"
        className="text-[14px]"
        disabled={!orderNumber}
      >
        show me
      </Button>
    </div>
  );
}
