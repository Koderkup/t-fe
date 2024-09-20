import ItemShop from "public/icons/item-shop.svg";
import ServicesIcon from "public/icons/services.svg";
import BookingIcon from "public/icons/booking.svg";
import EducationIcon from "public/icons/education.svg";
import HealthcareIcon from "public/icons/healthcare.svg";
import TransportIcon from "public/icons/transport.svg";
import { RoutesPaths } from "@/routes/paths.config";
import { ApplicationCardType } from "@/pages/main-page/types.ts";

export const APPLICATION_TYPES: ApplicationCardType[] = [
  {
    title: "application-type-list.item-shop.title",
    description: "application-type-list.item-shop.description",
    icon: ItemShop,
    href: `${RoutesPaths.CREATE_APP}/${RoutesPaths.FIRST_STEP}`,
    blocked: false,
  },
  {
    title: "application-type-list.services.title",
    description: "application-type-list.services.description",
    icon: ServicesIcon,
    href: "/",
    blocked: true,
  },
  {
    title: "application-type-list.booking.title",
    description: "application-type-list.booking.description",
    icon: BookingIcon,
    href: "/",
    blocked: true,
  },
  {
    title: "application-type-list.education.title",
    description: "application-type-list.education.description",
    icon: EducationIcon,
    href: "/",
    blocked: true,
  },
  {
    title: "application-type-list.healthcare.title",
    description: "application-type-list.healthcare.description",
    icon: HealthcareIcon,
    href: "/",
    blocked: true,
  },
  {
    title: "application-type-list.transport.title",
    description: "application-type-list.transport.description",
    icon: TransportIcon,
    href: "/",
    blocked: true,
  },
] as const;
