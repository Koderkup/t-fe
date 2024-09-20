import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { AdBlock } from "@/shared/types/ad-block.interface.ts";
import { ToggleItemCard, Typography } from "@/components";
import { useAdBlockAPI } from "@/hooks/api/useAdBlockAPI.ts";
import { RoutesPaths } from "@/routes/paths.config.ts";

type Props = {
  data: AdBlock[];
};

const AdBlockList: FC<Props> = ({ data }) => {
  const { updateAdBlock } = useAdBlockAPI();
  const navigate = useNavigate();

  const handleToggle = (elem: AdBlock, isActive: boolean) => {
    const formData = new FormData();
    formData.append("isActive", JSON.stringify(isActive));
    formData.append("mediaUrl", elem.mediaUrl);
    updateAdBlock.mutate({ id: elem.id, data: formData });
  };

  return (
    <>
      {data.map(elem => (
        <ToggleItemCard
          key={elem.id}
          imageUrl={elem.mediaUrl}
          onToggle={isActive => handleToggle(elem, isActive)}
          isActive={elem.isActive}
          onClick={() => navigate(`${RoutesPaths.AD_BLOCK}/${elem.id}`)}
        >
          <Typography
            variant="body-xl"
            color="main_black"
            className="font-medium"
          >
            {elem.promoTitle}
          </Typography>
          <Typography variant="body-md" color="black_100">
            {elem.description}
          </Typography>
        </ToggleItemCard>
      ))}
    </>
  );
};

export default AdBlockList;
