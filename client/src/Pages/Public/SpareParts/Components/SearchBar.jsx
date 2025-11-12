import React, { useEffect, useState, useRef } from "react";

import "./../SpareParts.css";

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
    <div className="spp searchbar">
      <input value={local} onChange={handleChange} placeholder={placeholder} />
      <button className="btn-primary" onClick={() => onChange(local)}>
        Search
      </button>
    </div>
  );
}
