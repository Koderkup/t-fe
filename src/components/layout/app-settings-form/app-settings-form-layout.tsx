import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { SingleValue } from "react-select";
import { InputField } from "@/components";
import { AppSettingsFormFields } from "@/shared/types/types.ts";
import { useTgStore } from "@/store/tg-store.ts";
import InputArrow from "../../../../public/icons/input-arrow.svg";
import LanguageModal from "@/components/ui/modals/language-modal/language-modal.tsx";
import { LanguagesTypes } from "@/shared/constants.ts";
import { saveLanguageToStorage } from "@/utils/language-storage.ts";
import i18n from "@/i18n";
import { useUserAPI } from "@/hooks/api/useUserAPI";
import { useTelegram } from "@/hooks/useTelegram";

interface AppSettingsFormLayoutProps {
  type?: "create" | "edit";
}

const AppSettingsFormLayout: FC<AppSettingsFormLayoutProps> = ({ type }) => {
  const { userPhoneNumber } = useTgStore();
  const { t } = useTranslation("translation");
  const { user } = useTelegram();
  const { updateUser } = useUserAPI();
  const [showModal, setShowModal] = useState(false);
  const currentLanguage = i18next.language as LanguagesTypes;

  const {
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useFormContext<AppSettingsFormFields>();

  const handleLanguageSelect = (
    data: SingleValue<{ value: LanguagesTypes; label: string }>
  ) => {
    if (!data) return;
    setShowModal(false);

    i18next.changeLanguage(data.value, () => {
      setValue("language", t(`languages-modal.${data.value}`) || "");
      saveLanguageToStorage(data.value);
    });
  };

  const userName = watch("name");
  const userLastName = watch("lastName");

  return (
    <div className="px-4 pb-[10px]">
      <form className="flex flex-col gap-[137px]">
        <div className="flex flex-col gap-4">
          <InputField
            disabled
            defaultValue={userPhoneNumber}
            label={t("app-settings-page.phone-number")}
          />
          <InputField
            placeholder={t("app-settings-page.name")}
            label={t("app-settings-page.name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", {
              required: i18n.t("error-messages.required"),
              onChange: () => {
                clearErrors("name");
              },
              onBlur: () => {
                if (userName.length === 0) {
                  setError("name", {
                    message: i18n.t("error-messages.required"),
                  });
                  return;
                }

                if (type === "edit") {
                  updateUser.mutate({
                    telegramId: user?.id.toString() || "",
                    firstname: userName,
                  });
                }
              },
            })}
          />
          <InputField
            placeholder={t("app-settings-page.last-name-placeholder")}
            label={t("app-settings-page.last-name")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register("lastName", {
              required: i18n.t("error-messages.required"),
              onChange: () => {
                clearErrors("lastName");
              },
              onBlur: () => {
                if (userLastName.length === 0) {
                  setError("lastName", {
                    message: i18n.t("error-messages.required"),
                  });
                  return;
                }

                if (type === "edit") {
                  updateUser.mutate({
                    telegramId: user?.id.toString() || "",
                    lastname: userLastName,
                  });
                }
              },
            })}
          />
          <div className="relative">
            <InputField
              label={t("app-settings-page.language")}
              error={!!errors.language}
              helperText={errors.language?.message}
              className="cursor-pointer"
              placeholder={t("app-settings-page.language-placeholder")}
              onClick={e => {
                e.stopPropagation();
                setShowModal(true);
              }}
              {...register("language")}
              readOnly
            />
            <div className="absolute right-[16px] top-[42.5px]">
              <InputArrow />
            </div>
          </div>
        </div>
      </form>

      <LanguageModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onLanguageChange={handleLanguageSelect}
        defaultLanguage={currentLanguage}
      />
    </div>
  );
};

export default AppSettingsFormLayout;
