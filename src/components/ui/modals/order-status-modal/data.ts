import PaidIcon from "public/icons/paid-icon.svg";
import PendingIcon from "public/icons/pending-icon.svg";
import ConfirmedIcon from "public/icons/confirmed-icon.svg";
import ShippedIcon from "public/icons/shipped-icon.svg";
import DeliveredIcon from "public/icons/delivered-icon.svg";
import CancelledIcon from "public/icons/cancelled-icon.svg";

export const ORDER_STATUS = [
  {
    name: "Pending",
    icon: PendingIcon,
  },
  {
    name: "Paid",
    icon: PaidIcon,
  },
  {
    name: "Confirmed",
    icon: ConfirmedIcon,
  },
  {
    name: "Shipped",
    icon: ShippedIcon,
  },
  {
    name: "Delivered",
    icon: DeliveredIcon,
  },
  {
    name: "Cancelled",
    icon: CancelledIcon,
  },
] as const;
