import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryService } from "@/services/category.service.ts";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useMainStore } from "@/store/main-store";

export const useCategoriesAPI = (id?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<{ categoryId: string }>();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  const categories = useQuery({
    queryKey: ["categories", activeShopId],
    queryFn: () => CategoryService.getAllCategories(activeShopId || ""),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
  });

  const category = useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoryService.getCategoryById(id || ""),
    select: ({ data }) => data,
    enabled: !!id,
  });

  const createCategory = useMutation({
    mutationFn: CategoryService.createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories", activeShopId],
      });
      navigate(RoutesPaths.CATEGORIES);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: CategoryService.deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories", activeShopId],
      });

      if (params.categoryId) navigate(RoutesPaths.CATEGORIES);
    },
  });

  return { categories, category, createCategory, deleteCategory };
};
