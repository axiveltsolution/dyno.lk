import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Components/SearchBar';
import FiltersBar from './Components/FiltersBar';
import './styles.css';

// API for JSON calls, API_BASE for static assets (images)
const API = import.meta.env.VITE_API_BASE || 'http://localhost:7001/api';
const CRC_API_BASE = API.replace(/\/api$/, '');   // <-- removes "/api" from the base URL

export default function BikeList() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchFilters = useCallback(async () => {
    try {
      const res = await fetch(`${API}/spares/filters/bikes`);
      const json = await res.json();
      setTypes(json.types || []);
      setCategories(json.categories || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchBikes = useCallback(async ({ q, type, category } = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (type) params.set('type', type);
      if (category) params.set('category', category);

      const res = await fetch(`${API}/spares/search/bikes?${params.toString()}`);
      const json = await res.json();
      setBikes(json.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    fetchBikes({ q, type: typeFilter, category: categoryFilter });
  }, [fetchBikes, q, typeFilter, categoryFilter]);

  return (
    <div className="container">
      <div className="page-head">
        <h1>Spare Parts Catalogue</h1>
        <p className="muted">Choose your bike or scooter to view its spare parts.</p>
      </div>

      <div className="search-row">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Search bikes, categories or types..."
        />
        <div className="filters-small">
          <FiltersBar
            types={types}
            categories={categories}
            onSelectType={t => setTypeFilter(prev => (prev === t ? '' : t))}
            onSelectCategory={c => setCategoryFilter(prev => (prev === c ? '' : c))}
            activeType={typeFilter}
            activeCategory={categoryFilter}
          />
        </div>
      </div>

      <section className="grid bikes-grid">
        {loading && <div className="loader">Loading...</div>}
        {!loading && bikes.length === 0 && <div className="empty">No bikes found.</div>}

        {bikes.map(b => (
          <article key={b._id} className="card bike-card">
            <Link to={`/spares/bike/${b.slug}`} className="bike-link">
              <div className="bike-media">
                {b.image ? (
                  <img src={`${CRC_API_BASE}${b.image}`} alt={b.name} />
                ) : (
                  <div className="no-image">No image</div>
                )}
              </div>
              <div className="card-body">
                <h3>{b.name}</h3>
                {b.excerpt && <p className="excerpt">{b.excerpt}</p>}
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}