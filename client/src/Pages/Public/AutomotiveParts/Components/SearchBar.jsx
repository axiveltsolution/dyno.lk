import React, { useEffect, useState, useRef } from "react";
// No CSS import needed here if imported in parent, but ensure logic is same

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  const [local, setLocal] = useState(value || "");
  const timer = useRef(null);

  useEffect(() => setLocal(value || ""), [value]);

  function handleChange(e) {
    const v = e.target.value;
    setLocal(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(v), 300);
  }

  return (
    <div className="dyno-search-row">
      {" "}
      {/* Use new class from CSS */}
      <input value={local} onChange={handleChange} placeholder={placeholder} />
    </div>
  );
}
