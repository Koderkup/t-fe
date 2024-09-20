import PendingIcon from "public/icons/pending-icon.svg";
import PaidIcon from "public/icons/paid-icon.svg";
import ConfirmedIcon from "public/icons/confirmed-icon.svg";
import ShippedIcon from "public/icons/shipped-icon.svg";
import DeliveredIcon from "public/icons/delivered-icon.svg";
import CancelledIcon from "public/icons/cancelled-icon.svg";

export const STATUS_VARIANTS = [
  {
    icon: PendingIcon,
    text: "Pending",
  },
  {
    icon: PaidIcon,
    text: "Paid",
  },
  {
    icon: ConfirmedIcon,
    text: "Confirmed",
  },
  {
    icon: ShippedIcon,
    text: "Shipped",
  },
  {
    icon: DeliveredIcon,
    text: "Delivered",
  },
  {
    icon: CancelledIcon,
    text: "Cancelled",
  },
];
