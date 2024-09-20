import { FC } from "react";
import FeatureRow from "./feature-row";
import { IFunctionality } from "@/shared/types/creation-steps.interface";

interface SubMenuProps extends Pick<IFunctionality, "subMenu"> {}

const SubMenu: FC<SubMenuProps> = ({ subMenu }) => {
  return (
    <ul className="w-full bg-white">
      {subMenu?.map(data => (
        <li className="relative" key={data.id}>
          <FeatureRow featureName={data.name} url={data.name.toLowerCase()} />
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
