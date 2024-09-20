import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import Cell from "@/components/ui/cell/cell";
import usePreloadTranslation from "@/hooks/usePreloadTranslation";

interface ApplicationTypeCardProps {
  icon: string;
  href: string;
  description: string;
  children: ReactNode;
}

const ApplicationTypeCard: FC<ApplicationTypeCardProps> = ({
  icon,
  href,
  description,
  children,
}) => {
  const { preloadFn } = usePreloadTranslation();
  const Icon = icon;

  return (
    <Link
      to={href}
      onClick={e => {
        e.preventDefault();
        preloadFn("step-one-page", href);
      }}
    >
      <Cell icon={<Icon />} size="menu-size" description={description}>
        {children}
      </Cell>
    </Link>
  );
};

export default ApplicationTypeCard;
