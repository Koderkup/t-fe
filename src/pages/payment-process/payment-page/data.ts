import Stripe from "public/icons/stripe.svg";
import Ton from "public/icons/ton.svg";

export const PAYMENT_METHODS = [
  {
    icon: Stripe,
    title: "Stripe",
    description: "payment-methods.stripe.description",
  },
  {
    icon: Ton,
    title: "TON",
    description: "payment-methods.ton.description",
  },
] as const;
