import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PromoCode } from "@/shared/types/promo-code.interface.ts";
import { usePromoCodesAPI } from "@/hooks/api/usePromoCodesAPI.ts";
import { ToggleItemCard, Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { PROMO_CODE_DATE_FORMAT } from "@/shared/constants.ts";
import { formatDate } from "@/utils/date-fns.ts";

type Props = {
  data: PromoCode[];
};

const PromoCodeList: FC<Props> = ({ data }) => {
  const { updatePromoCode } = usePromoCodesAPI();
  const navigate = useNavigate();

  const handleToggle = (elem: PromoCode, isActive: boolean) => {
    updatePromoCode.mutate({ ...elem, isActive });
  };

  return (
    <>
      {data.map(elem => (
        <ToggleItemCard
          key={elem.id}
          onToggle={isActive => handleToggle(elem, isActive)}
          isActive={elem.isActive}
          onClick={() => navigate(`${RoutesPaths.PROMO_CODES}/${elem.id}`)}
          size="small"
          showImage={false}
        >
          <Typography
            variant="body-2xl"
            color="main_black"
            className="font-medium"
          >
            {elem.code}
          </Typography>
          <Typography variant="body-xl" color="main_black" className="mt-0.5">
            {elem.discount}% off
          </Typography>

          <Typography
            variant="body-md"
            color="main_black"
            className="mt-2 capitalize"
          >
            {formatDate(elem.startDate, PROMO_CODE_DATE_FORMAT)}
            <span className="mx-2">-</span>
            {formatDate(elem.endDate, PROMO_CODE_DATE_FORMAT)}
          </Typography>
        </ToggleItemCard>
      ))}
    </>
  );
};

export default PromoCodeList;
