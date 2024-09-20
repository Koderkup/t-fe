import { FC, useMemo } from "react";
import Select, { SingleValue } from "react-select";
import { useTranslation } from "react-i18next";
import { ModalPageRoot, PageContainer, Typography } from "@/components";
import { LANGUAGES_OPTIONS } from "@/components/ui/modals/language-modal/data.ts";
import { LanguagesTypes } from "@/shared/constants.ts";
import { getLanguageDefaultOption } from "@/utils/get-language-default-option.ts";

type Props = {
  showModal: boolean;
  onClose: () => void;
  onLanguageChange: (
    value: SingleValue<{ value: LanguagesTypes; label: string }>
  ) => void;
  defaultLanguage: LanguagesTypes;
};

const LanguageModal: FC<Props> = ({
  showModal,
  onClose,
  onLanguageChange,
  defaultLanguage,
}) => {
  const { t } = useTranslation("translation");

  const languages = useMemo(
    () =>
      LANGUAGES_OPTIONS.map(option => ({
        value: option.value,
        label: option.label,
      })),
    []
  );

  const defaultLanguageOption = getLanguageDefaultOption(
    languages,
    defaultLanguage
  );

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <PageContainer>
        <Typography variant="heading-md" tag="h1" color="black_100">
          {t("languages-modal.title")}
        </Typography>

        <div className="mt-4">
          <Select
            classNamePrefix="select-shop-type"
            placeholder={t("languages-modal.input-placeholder")}
            options={languages}
            defaultValue={defaultLanguageOption}
            onChange={data => onLanguageChange(data)}
            menuIsOpen
          />
        </div>
      </PageContainer>
    </ModalPageRoot>
  );
};

export default LanguageModal;
