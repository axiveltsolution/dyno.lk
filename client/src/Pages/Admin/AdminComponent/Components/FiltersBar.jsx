import React from "react";
import "./../AdminComponents.css";

export default function FiltersBar({
  bikes = [],
  types = [],
  categories = [],

  selectedBike = "",
  onSelectBike,

  selectedType = "",
  onSelectType,

  selectedCategory = "",
  onSelectCategory,

  // These props control visibility (rendering)
  showBikeFilter = true,
  showTypeFilter = true,
  showCategoryFilter = true,
}) {
  return (
    <div className="admin-filters-bar">
      {/* Bike Filter */}
      {showBikeFilter && (
        <div className="admin-filter-group">
          <span className="admin-filter-label">Bike:</span>
          <select
            value={selectedBike}
            onChange={(e) => onSelectBike(e.target.value)}
            className="admin-select">
            <option value="">All Bikes</option>
            {bikes.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Type Filter */}
      {showTypeFilter && (
        <div className="admin-filter-group">
          <span className="admin-filter-label">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => onSelectType(e.target.value)}
            className="admin-select">
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Category Filter */}
      {showCategoryFilter && (
        <div className="admin-filter-group">
          <span className="admin-filter-label">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="admin-select">
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
