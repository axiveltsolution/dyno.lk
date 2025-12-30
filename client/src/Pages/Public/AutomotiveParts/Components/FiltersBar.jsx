import React from "react";
// CSS classes mapped to new AutomotiveParts.css

export default function FiltersBar({
  types = [],
  categories = [],
  onSelectType,
  onSelectCategory,
  activeType,
  activeCategory,
}) {
  return (
    <div className="spp filters-bar">
      {" "}
      {/* Keep old class for JS mapping, overridden in CSS */}
      <div className="filter-row">
        <strong>Type:</strong>
        <div className="buttons">
          <button
            className={`chip ${activeType === "" ? "active" : ""}`}
            onClick={() => onSelectType("")}>
            All
          </button>
          {types.map((t) => (
            <button
              key={t}
              className={`chip ${activeType === t ? "active" : ""}`}
              onClick={() => onSelectType(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-row">
        <strong>Category:</strong>
        <div className="buttons">
          <button
            className={`chip ${activeCategory === "" ? "active" : ""}`}
            onClick={() => onSelectCategory("")}>
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${activeCategory === c ? "active" : ""}`}
              onClick={() => onSelectCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
