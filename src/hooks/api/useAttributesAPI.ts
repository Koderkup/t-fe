import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AttributeService } from "@/services/attribute.service";
import { ProductService } from "@/services/product.service";
import { CreateColorDto, CreateSizeDto } from "@/services/types";

export const useAttributesAPI = () => {
  const queryClient = useQueryClient();

  const updateProduct = useMutation({
    mutationFn: ProductService.updateProduct,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({
        queryKey: ["product", data.id],
      });
    },
  });

  const updateColor = useMutation({
    mutationFn: AttributeService.updateColor,
  });

  const updateSize = useMutation({
    mutationFn: AttributeService.updateSize,
  });

  const createSize = useMutation({
    mutationFn: ({
      producData,
      ...rest
    }: CreateSizeDto & {
      producData: {
        productId: string;
        mediasUrl: Array<string>;
      };
    }) => AttributeService.createSize(rest),
    onSuccess: ({ data }, { producData }) => {
      if (data.id) {
        const formData = new FormData();
        formData.append("sizes", JSON.stringify([data.id]));
        formData.append("mediasUrl", JSON.stringify(producData.mediasUrl));

        updateProduct.mutate({
          productId: producData.productId,
          data: formData,
        });
      }
    },
  });

  const createColor = useMutation({
    mutationFn: ({
      producData,
      ...rest
    }: CreateColorDto & {
      producData: {
        productId: string;
        mediasUrl: Array<string>;
      };
    }) => AttributeService.createColor(rest),
    onSuccess: ({ data }, { producData }) => {
      if (data.id) {
        const formData = new FormData();
        formData.append("colors", JSON.stringify([data.id]));
        formData.append("mediasUrl", JSON.stringify(producData.mediasUrl));

        updateProduct.mutate({
          productId: producData.productId,
          data: formData,
        });
      }
    },
  });

  const deleteColor = useMutation({
    mutationFn: AttributeService.deleteColor,
  });

  const deleteSize = useMutation({
    mutationFn: AttributeService.deleteSize,
  });

  return {
    updateColor,
    updateSize,
    createSize,
    createColor,
    deleteColor,
    deleteSize,
  };
};
