// src/Filters.tsx
import React, { useState, useEffect } from "react";
import { FiltersProps } from "./FilterTypes";
import {
  AUTHOR_LIST,
  ENTER,
  NEWS_CATEGORY_LIST,
  SOURCE_LIST,
} from "../../constants/appConstants";
import "./Filters.css";
import { FaSearch } from "react-icons/fa";

// Reusable select filter component
const SelectFilter: React.FC<{
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ name, value, options, onChange }) => (
  <select name={name} value={value} onChange={onChange}>
    {options.map(({ label, value }) => (
      <option key={label} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  filterConfig,
}) => {
  const [searchQuery, setSearchQuery] = useState(filters?.searchQuery || "");

  // Synchronize searchQuery with filters if filters.searchQuery changes externally
  useEffect(() => {
    if (filters?.searchQuery !== searchQuery) {
      setSearchQuery(filters?.searchQuery || "");
    }
  }, [filters?.searchQuery]);

  // Handle changes in filters and pass back to App.tsx
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle Enter key press to trigger filter change
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER) {
      handleSearchIconClick();
    }
  };

  // Handle search icon click to trigger filter change
  const handleSearchIconClick = () => {
    if (searchQuery !== filters?.searchQuery) {
      onFilterChange({ ...filters, searchQuery });
    }
  };

  return (
    <div className="filters">
      {filterConfig.searchQuery && (
        <div className="input-wrapper">
          <FaSearch onClick={handleSearchIconClick} className="search-icon" />
          <input
            type="text"
            placeholder="Search for articles"
            name="searchQuery"
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={handleSearchIconClick}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
      {filterConfig.category && (
        <SelectFilter
          name="category"
          value={filters?.category}
          options={NEWS_CATEGORY_LIST}
          onChange={handleFilterChange}
        />
      )}
      {filterConfig.source && (
        <SelectFilter
          name="source"
          value={filters?.source}
          options={SOURCE_LIST}
          onChange={handleFilterChange}
        />
      )}
      {filterConfig.author && (
        <SelectFilter
          name="author"
          value={filters?.author}
          options={AUTHOR_LIST}
          onChange={handleFilterChange}
        />
      )}
      {filterConfig.date && (
        <input
          name="date"
          value={filters?.date}
          type="date"
          onChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default Filters;
