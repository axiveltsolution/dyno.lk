// client/src/Pages/Admin/AdminComponent/Components/SearchAndFilter.jsx
import SearchBar from "./SearchBar.jsx";
import "./../AdminComponents.css";

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search all items..."
      />

      {categories.length > 0 && (
        <div className="admin-category-filter-wrapper">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`admin-category-btn ${
                selectedCategory === cat.value ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.value)}>
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
