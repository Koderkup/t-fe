import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AdBlockService } from "@/services/ad-block.service.ts";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useMainStore } from "@/store/main-store";

export const useAdBlockAPI = (id?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeShopId, setActiveMedia] = useMainStore(state => [
    state.activeShopId,
    state.setActiveMedia,
  ]);

  const adBlocks = useQuery({
    queryKey: ["all ad blocks", "adBlocks", activeShopId],
    queryFn: () => AdBlockService.getAllAdBlocks(activeShopId || ""),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
  });

  const adBlockById = useQuery({
    queryKey: ["all ad blocks", "adBlock by id", id],
    queryFn: () => AdBlockService.getAdBlockById(id || ""),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

  const createAdBlock = useMutation({
    mutationFn: AdBlockService.createAdBlock,
    mutationKey: ["create ad block"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["all ad blocks", "adBlocks", activeShopId],
      });
      setActiveMedia(null);
      navigate(RoutesPaths.AD_BLOCK);
    },
  });

  const updateAdBlock = useMutation({
    mutationFn: AdBlockService.updateAdBlock,
    mutationKey: ["update ad block"],
    onSuccess: async () => {
      setActiveMedia(null);
      await queryClient.invalidateQueries({ queryKey: ["all ad blocks"] });
    },
  });

  const deleteAdBlock = useMutation({
    mutationFn: AdBlockService.deleteAdBlock,
    mutationKey: ["delete ad block"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["all ad blocks", "adBlocks", activeShopId],
      });
      setActiveMedia(null);
      navigate(RoutesPaths.AD_BLOCK);
    },
  });

  return { adBlocks, adBlockById, createAdBlock, updateAdBlock, deleteAdBlock };
};
