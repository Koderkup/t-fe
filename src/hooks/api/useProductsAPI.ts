import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ProductService } from "@/services/product.service.ts";
import { RoutesPaths } from "@/routes/paths.config";
import { useMainStore } from "@/store/main-store";
import { getDifferences } from "@/utils/get-differences";
import { useAttributesAPI } from "./useAttributesAPI";
import { Color } from "@/shared/types/color.interface";

export const useProductsAPI = (id?: string) => {
  const queryClient = useQueryClient();
  const [attributes, clearAttributes, activeShopId] = useMainStore(state => [
    state.attributes,
    state.clearAttributes,
    state.activeShopId,
  ]);
  const navigate = useNavigate();
  const {
    createSize,
    deleteSize,
    createColor,
    deleteColor,
    updateColor,
    updateSize,
  } = useAttributesAPI();

  const products = useQuery({
    queryKey: ["products", activeShopId],
    queryFn: () => ProductService.getAllProducts(activeShopId || ""),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
  });

  const product = useQuery({
    queryKey: ["products", activeShopId, id],
    queryFn: () => ProductService.getProductById(id || ""),
    select: ({ data }) => data,
    enabled: !!id,
  });

  const addProductToCategory = useMutation({
    mutationFn: ProductService.addProductToCategory,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({
        queryKey: ["category", data.id],
      });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ProductService.updateProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products", activeShopId],
      });
    },
  });

  const updateCreatedProduct = useMutation({
    mutationFn: ProductService.updateProduct,
    onSuccess: async ({ data }) => {
      if (data.id) {
        const isColorAttribute = attributes.find(
          el => el.attributeName === "Color"
        );
        const isSizeAttribute = attributes.find(
          el => el.attributeName === "Size"
        );

        const {
          newAttributes: newColors,
          deletedAttributes: deletedColors,
          updatedAttributes: updatedColors,
        } = getDifferences(data.colors, isColorAttribute?.options || []);

        const {
          newAttributes: newSizes,
          deletedAttributes: deletedSizes,
          updatedAttributes: updatedSizes,
        } = getDifferences(data.sizes, isSizeAttribute?.options || []);

        if (newSizes) {
          newSizes.forEach(el => {
            const sizeData = { shopId: data.shopId, name: el.name };
            createSize.mutate({
              ...sizeData,
              producData: {
                productId: data.id,
                mediasUrl: data.mediasUrl,
              },
            });
          });
        }

        if (newColors) {
          (newColors as Color[]).forEach(el => {
            const colorData = {
              shopId: data.shopId,
              name: el.name,
              hexCode: el.hexCode,
            };
            createColor.mutate({
              ...colorData,
              producData: {
                productId: data.id,
                mediasUrl: data.mediasUrl,
              },
            });
          });
        }

        if (deletedSizes) {
          deletedSizes.forEach(el => {
            deleteSize.mutate(el.id || "");
          });
        }

        if (deletedColors) {
          deletedColors.forEach(el => {
            deleteColor.mutate(el.id || "");
          });
        }

        if (updatedColors && isColorAttribute) {
          const activeColors = isColorAttribute.options.filter(el => el.id);
          activeColors.forEach(el => {
            updateColor.mutate({
              id: el.id,
              hexCode: el.hexCode || "",
              name: el.name,
            });
          });
        }

        if (updatedSizes && isSizeAttribute) {
          const activeSizes = isSizeAttribute.options.filter(el => el.id);
          console.log(activeSizes);
          activeSizes.forEach(el => {
            updateSize.mutate({
              id: el.id,
              name: el.name,
            });
          });
        }

        clearAttributes();

        await queryClient.invalidateQueries({
          queryKey: ["products", activeShopId],
        });
        navigate(-1);
      }
    },
  });

  const createProduct = useMutation({
    mutationFn: ProductService.createProduct,
    onSuccess: async ({ data }) => {
      if (data.shopId) {
        const isColorAttribute = attributes.find(
          el => el.attributeName === "Color"
        );
        const isSizeAttribute = attributes.find(
          el => el.attributeName === "Size"
        );

        if (isColorAttribute) {
          isColorAttribute.options.forEach(el => {
            const colorData = {
              shopId: data.shopId,
              name: el.name,
              hexCode: el.hexCode || "",
            };
            createColor.mutate({
              ...colorData,
              producData: {
                productId: data.id,
                mediasUrl: data.mediasUrl,
              },
            });
          });
        }

        if (isSizeAttribute) {
          isSizeAttribute.options.forEach(el => {
            const sizeData = { shopId: data.shopId, name: el.name };
            createSize.mutate({
              ...sizeData,
              producData: {
                productId: data.id,
                mediasUrl: data.mediasUrl,
              },
            });
          });
        }

        addProductToCategory.mutate({
          categoryId: data.categoryTypeId,
          ids: [data.id],
        });

        clearAttributes();
        await queryClient.invalidateQueries({
          queryKey: ["products", activeShopId],
        });
        navigate(RoutesPaths.PRODUCTS);
      }
    },
  });

  return {
    products,
    product,
    createProduct,
    updateProduct,
    updateCreatedProduct,
  };
};
