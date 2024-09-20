import { FC, PropsWithChildren } from "react";

const ProductsList: FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-x-2 gap-y-4">{children}</div>;
};

export default ProductsList;
