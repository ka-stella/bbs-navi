// エリア型定義
export interface AreaData {
  id: string;
  name: string;
  url: string;
  postsCount: string;
}

//カテゴリ
export interface Category {
  name: string;
  subCategories: SubCategory[];
}

//サブカテゴリ
export interface SubCategory {
  name: string;
  url: string;
}
