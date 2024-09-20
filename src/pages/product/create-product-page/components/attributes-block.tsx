import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "../../../../../public/icons/add-fill.svg";
import { AttributeModal, Button, Typography } from "@/components";
import CreatedAttribute from "./created-attribute";
import { useMainStore } from "@/store/main-store";
import { AttributesFields } from "@/shared/types/product.interface";
import { AttributesOptions } from "@/shared/types/types";

const AttributesBlock: FC = () => {
  const { t } = useTranslation("products-pages");
  const [attributes] = useMainStore(state => [state.attributes]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<AttributesFields | null>(null);

  const handleOpenModal = useCallback((data?: AttributesFields) => {
    if (data) {
      setModalData(data);
    } else {
      setModalData(null);
    }
    setShowModal(true);
  }, []);

  return (
    <>
      <div className="flex w-full flex-col gap-y-2">
        <Typography variant="body-md" color="black_80">
          {t("create-product-page.attributes")}
        </Typography>

        <div className="flex flex-col gap-y-2">
          {attributes.map(el => (
            <CreatedAttribute
              key={el.attributeName}
              attributeName={t(
                `attribute-modal.form.name.options.${el.attributeName.toLowerCase() as AttributesOptions}`
              )}
              clickFn={() => handleOpenModal(el)}
            />
          ))}
        </div>

        {attributes.length < 2 && (
          <Button
            variant="outline"
            onClick={() => handleOpenModal()}
            icon={
              <span className="fill-black_20">
                <AddIcon />
              </span>
            }
          >
            {t("create-product-page.attributes-button-text")}
          </Button>
        )}
      </div>
      <AttributeModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        type={modalData ? "update" : "create"}
        attributeName={modalData?.attributeName}
        options={modalData?.options}
        id={modalData?.id}
      />
    </>
  );
};

export default AttributesBlock;
