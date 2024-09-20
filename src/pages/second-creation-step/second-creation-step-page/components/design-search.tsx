import { FC, useCallback, useState } from "react";
import Select, { MultiValue } from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { TAGS } from "../data";
import { InputField, Typography } from "@/components";
import { DesignTags } from "@/@types/i18next";

interface OptionType {
  value: string;
  label: string;
}

interface DesignSearchProps {
  onSearchChange: (text: string) => void;
  onTagChange: (tag: MultiValue<OptionType>) => void;
}

const DesignSearch: FC<DesignSearchProps> = ({
  onSearchChange,
  onTagChange,
}) => {
  const { t } = useTranslation("step-two-page");
  const [multiOptions, setMultiOptions] = useState<MultiValue<OptionType>>([]);
  const [isDefaultInput, setIsDefaultInput] = useState(true);

  const handleChange = useCallback(
    (selected: MultiValue<OptionType>) => {
      if (selected.length === 0) setIsDefaultInput(true);
      setMultiOptions(selected);
      onTagChange(selected);
    },
    [onTagChange]
  );

  const handleClick = (tag: string) => {
    setIsDefaultInput(false);
    const tagIdx = multiOptions.findIndex(el => el.value === tag);
    if (tagIdx !== -1) return;
    setMultiOptions(prev => [...prev, { value: tag, label: tag }]);
    onTagChange([...multiOptions, { value: tag, label: tag }]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mt-[6px] px-4">
        {isDefaultInput ? (
          <InputField
            placeholder={t("step-two-page.placeholder")}
            className="rounded-[20px] bg-search !bg-[95%] bg-no-repeat"
            onChange={e => {
              onSearchChange(e.target.value);
            }}
          />
        ) : (
          <Select
            classNamePrefix="design-serch-input"
            isMulti
            value={multiOptions}
            onChange={handleChange}
            isSearchable={false}
            placeholder={t("step-two-page.placeholder")}
          />
        )}
      </div>
      <div>
        <Swiper slidesPerView="auto" spaceBetween={8} className="!w-auto !px-4">
          {TAGS.map(tag => (
            <SwiperSlide key={tag.name} className="!w-auto overflow-hidden">
              <button
                type="button"
                onClick={() => handleClick(tag.name)}
                className="flex h-[30px] items-center rounded-[20px] border border-solid border-black_60 px-3"
              >
                <Typography
                  variant="body-base"
                  className="font-normal"
                  color="black_100"
                  tag="span"
                >
                  {t(`design-tags.${tag.name.toLowerCase() as DesignTags}`)}
                </Typography>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DesignSearch;
