// src/App.tsx
import React, { useState, useEffect, useCallback } from "react";
import Filters from "../Filters/Filters";
import "./News.css";
import { aggregateNewsApi } from "../../services/aggregateNewsApi";

import { Filter, FilterConfig } from "../Filters/FilterTypes";
import DisplayNewsList from "../DisplayNews/DisplayNewsList";
import { NewsProps } from "./NewsTypes";
import { filtersInitialState } from "../../constants/appConstants";

const News: React.FC<NewsProps> = ({ isPersonalized = false }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filter>(filtersInitialState);

  // Update filter state when filters change
  const handleFilterChange = (newFilters: Filter) => {
    setFilters(newFilters);
  };
  const getApiData = async () => {
    const articles = await aggregateNewsApi(filters);
    setArticles(articles);
  };

  useEffect(() => {
    setFilters(filtersInitialState);
  }, [isPersonalized]);

  // Re-fetch data when filter state changes
  useEffect(() => {
    getApiData();
  }, [filters]);

  const getFilterConfig = useCallback((): FilterConfig => {
    const commonFilters = {
      category: true,
      source: true,
    };

    // Conditionally add or remove the personalized filters
    const personalizedFilters = isPersonalized
      ? { author: true }
      : { searchQuery: true, date: true };

    // Merge the common filters with the personalized filters

    return { ...commonFilters, ...personalizedFilters };
  }, [isPersonalized]);

  return (
    <div className="article-search-conatiner">
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        filterConfig={getFilterConfig()}
      />
      <DisplayNewsList articles={articles} />
    </div>
  );
};

export default News;
