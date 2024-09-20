import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

export const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET!, {
  typescript: true,
});

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE!, {
  betas: ["custom_checkout_beta_2"],
});
