export const Categories = ["all", "interaction", "performance", "realword"];

export type CategoryType = typeof Categories[number];

export interface IArticleMeta {
  title: string;
  slug: string;
  date: string;
  category: CategoryType;
  tags: string[];
}
