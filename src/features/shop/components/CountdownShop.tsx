import Countdown from "react-countdown";
import type { AllProductsQuery } from "../../../graphql/storefront/graphql";

interface CountdownShopProps {
    releaseDate: Date;
    product: AllProductsQuery["products"]["nodes"][0];
}

export default function CountdownShop({ releaseDate, product }: CountdownShopProps) {
    const renderer = ({ days, hours, minutes, seconds, completed }: { days: number; hours: number; minutes: number; seconds: number; completed: boolean }) => {
        if (completed || product.totalInventory === 0 || !releaseDate) {
            return <span>{Number(product.priceRange.minVariantPrice.amount).toFixed(2)}</span>;
        } else {
            return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    }
    return <Countdown renderer={renderer} date={releaseDate} />

}