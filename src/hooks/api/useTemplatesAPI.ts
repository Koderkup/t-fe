import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "@/services/template.service";

export const useTemplatesAPI = () => {
  const templates = useQuery({
    queryFn: TemplateService.getTemplates,
    queryKey: ["templates"],
    select: data => data.data,
    staleTime: 5 * 60 * 1000,
  });

  return {
    templates,
  };
};
