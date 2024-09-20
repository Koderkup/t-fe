import { FC, useRef, useState } from "react";
import FeatureRow from "./feature-row";
import SubMenu from "./sub-menu";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { cn } from "@/utils/twMerge";
import { IFunctionality } from "@/shared/types/creation-steps.interface";

interface FeaturesListProps {
  data: Array<IFunctionality>;
}

const FeaturesList: FC<FeaturesListProps> = ({ data }) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const toggleSubMenu = (featureName: string, isSubMenuExist: boolean) => {
    if (isSubMenuExist)
      setOpenSubMenu(featureName === openSubMenu ? null : featureName);
  };

  useOnClickOutside(listRef, () => setOpenSubMenu(null));

  return (
    <ul ref={listRef}>
      <li className="relative">
        <FeatureRow featureName="All Features" url="payment-methods" />
      </li>
      {data.map(feature => (
        <li
          key={feature.id}
          className={cn(
            "relative overflow-hidden",
            openSubMenu === feature.name ? "submenu-open" : "submenu-close"
          )}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSubMenu(feature.name, !!feature.subMenu)}
            onKeyDown={() => toggleSubMenu(feature.name, !!feature.subMenu)}
            className="relative"
          >
            <FeatureRow
              featureName={feature.name}
              url={feature.subMenu ? "" : feature.id.toString()}
              isSubMenuOpen={feature.name === openSubMenu}
            />
          </div>
          {feature.subMenu && <SubMenu subMenu={feature.subMenu} />}
        </li>
      ))}
    </ul>
  );
};

export default FeaturesList;
