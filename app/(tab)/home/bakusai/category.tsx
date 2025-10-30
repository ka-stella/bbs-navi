import { LoadingIndicator } from "@/components/common/loading-indicator";
import CategoryList from "@/components/home/category-list";
import { useCategory } from "@/hooks/bakusai/use-category";
import { useLocalSearchParams } from "expo-router";

export default function BakusaiCategoryScreen(): React.JSX.Element {
  const params = useLocalSearchParams();

  // 前の画面から渡されたパラメータを取得
  const url = params.url as string;

  const { categories, isLoading } = useCategory(url);

  if (isLoading) return <LoadingIndicator />;

  return <CategoryList categories={categories ?? []} />;
}
