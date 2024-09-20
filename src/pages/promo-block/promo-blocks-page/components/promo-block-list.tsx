import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PromoBlock } from "@/shared/types/promo-block.interface.ts";
import { ToggleItemCard, Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { usePromoBlockAPI } from "@/hooks/api/usePromoBlockAPI.ts";

type Props = {
  data: PromoBlock[];
};

const PromoBlockList: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { updatePromoBlock } = usePromoBlockAPI();

  const handleToggle = (elem: PromoBlock, isActive: boolean) => {
    const formData = new FormData();
    formData.append("isActive", JSON.stringify(isActive));
    formData.append("mediaUrl", elem.mediaUrl);
    updatePromoBlock.mutate({ id: elem.id, data: formData });
  };

  return (
    <>
      {data.map(elem => (
        <ToggleItemCard
          key={elem.id}
          imageUrl={elem.mediaUrl}
          onToggle={isActive => handleToggle(elem, isActive)}
          isActive={elem.isActive}
          onClick={() => navigate(`${RoutesPaths.PROMO_BLOCK}/${elem.id}`)}
        >
          <Typography
            variant="body-xl"
            color="main_black"
            className="font-medium"
          >
            {elem.title}
          </Typography>
          <Typography variant="body-md" color="black_100">
            {elem.description}
          </Typography>
        </ToggleItemCard>
      ))}
    </>
  );
};

export default PromoBlockList;
