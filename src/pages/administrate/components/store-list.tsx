import { FC } from "react";
import StoreCard from "./store-card";
import { ShopFields } from "@/shared/types/shop.interface";

interface StoreListProps {
  storeData: Array<ShopFields>;
}

const StoreList: FC<StoreListProps> = ({ storeData }) => {
  return (
    <ul className="mt-4 flex flex-col">
      {storeData.map((el, idx) =>
        idx === storeData.length - 1 ? (
          <li key={el.id} className="py-2">
            <StoreCard
              id={el.id}
              title={el.name}
              description={el.description}
              imgUrl={el.mediaUrl}
            />
          </li>
        ) : (
          <li
            key={el.name}
            className="border-b border-solid border-[#DCE4E6] py-2"
          >
            <StoreCard
              id={el.id}
              title={el.name}
              description={el.description}
              imgUrl={el.mediaUrl}
            />
          </li>
        )
      )}
    </ul>
  );
};

export default StoreList;
