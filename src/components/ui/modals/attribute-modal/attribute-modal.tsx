import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, ModalPageRoot, Typography } from "@/components";
import AttributeForm from "./components/attribute-form";
import { AttributesFields, Option } from "@/shared/types/product.interface";
import { useMainStore } from "@/store/main-store";
import { cn } from "@/utils/twMerge";

type Props = {
  showModal: boolean;
  onClose: () => void;
  id?: string;
  attributeName?: string;
  options?: Array<Option>;
  type?: "create" | "update";
};

const AttributeModal: FC<Props> = ({
  showModal,
  onClose,
  id,
  attributeName,
  options,
  type,
}) => {
  const { t } = useTranslation("products-pages");
  const [setAttributes, deleteAttribute] = useMainStore(state => [
    state.setAttributes,
    state.deleteAttribute,
  ]);

  const methods = useForm<AttributesFields>({
    mode: "onBlur",
  });

  const activeOptions = methods.watch("options") || "";

  const onSubmit: SubmitHandler<AttributesFields> = data => {
    const formData = {
      id: id || Math.random().toFixed(2).toString(),
      attributeName: data.attributeName,
      options: data.options,
    };
    setAttributes(formData);
    methods.reset({ attributeName: "", options: [] });
    onClose();
  };

  useEffect(() => {
    if (type === "update" && showModal) {
      methods.reset({
        id: id || "",
        attributeName: attributeName || "",
        options: options || [],
      });
    }

    if (type === "create" && showModal) {
      methods.reset({
        id: "",
        attributeName: "",
        options: [],
      });
    }
  }, [attributeName, options, methods, id, type, showModal]);

  return (
    <ModalPageRoot
      showModal={showModal}
      onClose={() => {
        methods.reset({
          attributeName: "",
          options: [],
        });
        onClose();
      }}
    >
      <div className="flex h-screen flex-col justify-between overflow-y-auto px-4 py-2 pb-[9px]">
        <div>
          <Typography variant="heading-md" color="black_100">
            {t("attribute-modal.title")}
          </Typography>
          <FormProvider {...methods}>
            <AttributeForm />
          </FormProvider>
        </div>
        <div
          className={cn("mt-6 py-2.5", {
            "flex items-center justify-between gap-6": type === "update",
          })}
        >
          {type === "update" && (
            <button
              className="w-full"
              onClick={() => {
                deleteAttribute(attributeName || "");
                methods.reset({
                  id: "",
                  attributeName: "",
                  options: [],
                });
                onClose();
              }}
            >
              <Typography
                variant="body-base"
                className="font-medium !text-[#7e8089]"
              >
                {t("attribute-modal.action-buttons.delete-attribute")}
              </Typography>
            </button>
          )}
          <Button
            disabled={!methods.formState.isValid || activeOptions.length === 0}
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
          >
            {type === "update"
              ? t("attribute-modal.action-buttons.save-changes")
              : t("attribute-modal.action-buttons.save")}
          </Button>
        </div>
      </div>
    </ModalPageRoot>
  );
};

export default AttributeModal;
