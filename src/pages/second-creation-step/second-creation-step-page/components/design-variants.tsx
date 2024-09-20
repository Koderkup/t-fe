import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import designVariant from "public/images/design-variant.webp";
import { MultiValue } from "react-select";
import { useTranslation } from "react-i18next";
import { DropdownMenu } from "@/components";
import DesignCard from "./design-card";
import { useSecondCreationStepAPI } from "@/hooks/api/useSecondCreationStepAPI";
import DesignSearch from "./design-search";
import { useDebounce } from "@/hooks/useDebounce";
import { DesignTags } from "@/@types/i18next";

interface OptionType {
  value: string;
  label: string;
}

const DesignVariants: FC = () => {
  const { t } = useTranslation("step-two-page");
  const { designs } = useSecondCreationStepAPI();
  const [searchString, setSearchString] = useState("");
  const [activeTags, setActiveTags] = useState<MultiValue<OptionType>>([]);
  const debouncedSearchString = useDebounce(searchString, 400);

  const tags = useMemo(
    () => (activeTags.length ? activeTags.map(el => el.value) : []),
    [activeTags]
  );

  useEffect(() => {
    designs.mutate({
      limit: 10,
      searchString: debouncedSearchString,
      tags,
    });
  }, [debouncedSearchString, activeTags]);

  const handleSearchChange = useCallback((newSearchString: string) => {
    setSearchString(newSearchString);
  }, []);

  const handleTagChange = useCallback((tag: MultiValue<OptionType>) => {
    setActiveTags(tag);
  }, []);

  return (
    <>
      <DesignSearch
        onSearchChange={handleSearchChange}
        onTagChange={handleTagChange}
      />
      <div className="relative flex flex-col justify-between px-4 pb-[203px] pt-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          {designs.data?.data.map(design => (
            <Link key={design.id} to={design.id.toString()}>
              <DesignCard
                imgUrl={designVariant}
                title={design.name}
                price={+design.price.toFixed(2)}
                tag={
                  design.tags[1]
                    ? t(
                        `design-tags.${design.tags[1].toLowerCase() as DesignTags}`
                      )
                    : ""
                }
              />
            </Link>
          ))}
        </div>
        <DropdownMenu type="default" />
      </div>
    </>
  );
};

export default DesignVariants;
