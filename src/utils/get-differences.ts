import { Color } from "@/shared/types/color.interface";
import { Option } from "@/shared/types/product.interface";
import { Size } from "@/shared/types/size.interface";

export const getDifferences = (
  newItems: Array<Color> | Array<Size>,
  existingItems: Array<Option>
) => {
  const deletedAttributes = newItems.filter(
    item => !existingItems?.some(attr => attr.id === item.id)
  );

  const newAttributes = existingItems?.filter(
    attr => !newItems.some(item => item.id === attr.id)
  );

  const updatedAttributes = newItems.filter(item =>
    existingItems.some(
      attr =>
        attr.id === item.id &&
        (attr.name !== item.name || attr.hexCode !== item.hexCode)
    )
  );

  if (!existingItems.length) {
    return { newAttributes, deletedAttributes: newItems };
  }

  return { newAttributes, deletedAttributes, updatedAttributes };
};
