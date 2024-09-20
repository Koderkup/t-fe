import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "@/services/order.service";
import { useMainStore } from "@/store/main-store";

export const useOrdersAPI = (id?: string) => {
  const queryClient = useQueryClient();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: () => OrderService.getAllOrders(activeShopId || ""),
    select: ({ data }) => data,
  });

  const order = useQuery({
    queryKey: ["orders", id],
    queryFn: () => OrderService.getOrderById(id || ""),
    select: ({ data }) => data,
    enabled: !!id,
  });

  const updateOrder = useMutation({
    mutationFn: OrderService.updateOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });

  return { orders, order, updateOrder };
};
