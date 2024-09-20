import { FC } from "react";
import { useTranslation } from "react-i18next";
import testImg from "public/images/order-test.webp";
import { cn } from "@/utils/twMerge";
import { ProductPrices } from "@/shared/types/product.interface";
import Typography from "../../typography/typography";

export interface OrderItemProps {
  quantity: number;
  productItem: {
    name: string;
    prices: Array<ProductPrices>;
    mediaUrls: Array<string>;
  };
}

const OrderItemCard: FC<OrderItemProps> = ({ quantity, productItem }) => {
  const { t } = useTranslation("orders-pages");

  return (
    <div className="flex gap-3">
      <div className="h-[93px] w-[79px] flex-shrink-0">
        <img
          className="h-full w-full rounded-[13px] object-cover object-top"
          src={testImg}
          alt={productItem.name}
        />
      </div>

      <div className="flex w-full flex-col gap-y-[19px]">
        <div className="flex flex-col gap-y-1">
          <Typography
            variant="body-base"
            className="font-medium"
            color="black_100"
          >
            {productItem.name}
          </Typography>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center">
                <span
                  className={cn("h-2 w-2 rounded-full")}
                  style={{ backgroundColor: "#000" }}
                />
              </div>
              <Typography variant="body-sm" color="black_100">
                Black
              </Typography>
            </div>

            <Typography variant="body-sm" color="black_70">
              /
            </Typography>
            <Typography variant="body-sm" color="black_100">
              XS-S (32-34)
            </Typography>
            <Typography variant="body-sm" color="black_70">
              /
            </Typography>
            <Typography variant="body-sm" color="black_100">
              {t("quantity")}: {quantity}
            </Typography>
          </div>
        </div>
        <Typography
          variant="body-base"
          className="tracking-[0.01em]"
          color="black_100"
        >
          {productItem.prices[0].price} {productItem.prices[0].currency}
        </Typography>
      </div>
    </div>
  );
};

export default OrderItemCard;
