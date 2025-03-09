export interface FiltersProps {
  filters: Filter;
  onFilterChange: (filters: Filter) => void;
  filterConfig: FilterConfig;
}

export interface Filter {
  searchQuery?: string;
  category: string;
  source: string;
  date?: string;
  author?: string;
}

export interface FilterConfig {
  searchQuery?: boolean;
  category: boolean;
  source: boolean;
  date?: boolean;
  author?: boolean;
}
