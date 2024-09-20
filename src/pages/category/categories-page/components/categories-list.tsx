import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "@/shared/types/category.interface.ts";
import { CategoryCard } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useCategoriesAPI } from "@/hooks/api/useCategoriesAPI";

type Props = {
  data: Category[];
};

const CategoriesList: FC<Props> = ({ data }) => {
  const { deleteCategory } = useCategoriesAPI();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      {data.map(elem => (
        <CategoryCard
          key={elem.id}
          {...elem}
          deleteFn={() => deleteCategory.mutate(elem.id)}
          onClick={() => navigate(`${RoutesPaths.CATEGORIES}/${elem.id}`)}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
