import { FC, useMemo } from "react";
import DeleteIcon from "public/icons/delete-icon.svg";
import { Category } from "@/shared/types/category.interface.ts";
import { DeleteItemModal, IconButton, Typography } from "@/components";
import { useMainStore } from "@/store/main-store";

type Props = Partial<Category> & {
  onClick?: () => void;
  deleteFn: () => void;
  id: string;
};

const CategoryCard: FC<Props> = ({
  name,
  products,
  description,
  onClick,
  deleteFn,
  id,
}) => {
  const [activeItemId, setActiveItemId] = useMainStore(state => [
    state.activeItemId,
    state.setActiveItemId,
  ]);

  const isCardModalOpen = useMemo(
    () => activeItemId === id,
    [activeItemId, id]
  );

  console.log(id);

  return (
    <div
      className="cursor-pointer rounded-[24px] border border-stroke bg-main_bg p-4"
      role="presentation"
      onClick={onClick}
    >
      <div className="flex gap-1">
        <div className="flex flex-grow flex-col gap-1">
          <Typography variant="heading-md">{name}</Typography>

          <Typography variant="body-base">
            {products?.length || 0} <span className="ml-0.5">items</span>
          </Typography>
        </div>

        <IconButton
          size="medium"
          className="self-start p-2"
          onClick={e => {
            e.stopPropagation();
            setActiveItemId(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <Typography variant="body-base" className="mt-4 inline-block">
        {description}
      </Typography>

      <DeleteItemModal
        showModal={isCardModalOpen}
        onClose={() => setActiveItemId(null)}
        onDelete={deleteFn}
      />
    </div>
  );
};

export default CategoryCard;
