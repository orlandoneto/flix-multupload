declare interface UserMainGrid {
  name: string;
  format: string;
  url: string;
  url_thumb: string;
  url_cover: string;
}

declare interface UserMainGridCategory {
  id: number;
  user_main_grid_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  user_main_grid: UserMainGrid;
  category: Category;
}

declare interface Category {
  id: number;
  name: string;
  active: number;
  createdAt: string;
  updatedAt: string;
  user_main_grid_categories: UserMainGridCategory[];
}

declare type CategoriesGrouped = Category[];

declare interface ContentProps {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

declare interface TextProps {
  type: string;
  text: string;
  mb?: string;
  color?: string;
}

declare interface CarouselProps {
  typeSlider?: string;
  endpoint?: CategoriesGrouped;
  controls?: ContentProps;
  textComponent?: TextProps;
  isActiveControls?: boolean;
  isMobile?: boolean;
}
