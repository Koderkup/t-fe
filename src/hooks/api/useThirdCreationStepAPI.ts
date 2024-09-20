import { useQuery } from "@tanstack/react-query";
import { ThirdCreationStepService } from "@/services/third-creation-step.service";

export const useThirdCretionStepAPI = (id?: string) => {
  const functionalities = useQuery({
    queryKey: ["functionalities"],
    queryFn: ThirdCreationStepService.getAllFunctionalities,
    select: ({ data }) => data,
  });

  const functionality = useQuery({
    queryKey: ["functionalities", id],
    queryFn: () => ThirdCreationStepService.getFunctionalitieById(id || ""),
    select: ({ data }) => data,
    enabled: !!id,
  });

  return {
    functionalities,
    functionality,
  };
};
