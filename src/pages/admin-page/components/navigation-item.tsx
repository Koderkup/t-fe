import { FC, PropsWithChildren, ReactNode } from "react";
import { Link } from "react-router-dom";
import Cell from "@/components/ui/cell/cell.tsx";
import usePreloadTranslation from "@/hooks/usePreloadTranslation";

type Props = PropsWithChildren<{
  path: string;
  icon: ReactNode;
  namespace: string;
}>;

const NavigationItem: FC<Props> = ({ path, children, icon, namespace }) => {
  const { preloadFn } = usePreloadTranslation();

  return (
    <Link
      to={path}
      onClick={event => {
        event.preventDefault();
        preloadFn(namespace, path);
      }}
    >
      <Cell icon={icon}>{children}</Cell>
    </Link>
  );
};

export default NavigationItem;
