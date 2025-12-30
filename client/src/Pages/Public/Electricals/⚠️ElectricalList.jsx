import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function ElectricalList(){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchList(){
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      const res = await fetch(`${API}/electricals?${params.toString()}`);
      const json = await res.json();
      setItems(json.items || []);
    } catch(err){ console.error(err); }
    setLoading(false);
  }

  useEffect(()=>{ fetchList(); }, []);

  return (
    <div>
      <div className="page-head"><h1>Electrical Accessories</h1><p className="muted">Find lighting, electrics and accessories.</p></div>

      <div className="search-row">
        <input placeholder="Search electricals..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" onClick={()=>fetchList()}>Search</button>
      </div>

      {loading ? <div className="loader"><div className="spinner"/></div> : (
        <div className="grid bikes-grid">
          {items.map(it => (
            <article key={it._id} className="card bike-card">
              <Link to={`/electricals/${it.slug}`} className="bike-link">
                <div className="bike-media">
                  {it.coverImage ? <img src={`${API}${it.coverImage}`} alt={it.title} /> : <div className="no-image">No image</div>}
                </div>
                <div className="card-body">
                  <h3>{it.title}</h3>
                  <p className="excerpt">{it.excerpt}</p>
                  <div className="price">{it.price ? `LKR ${it.price}` : ''}</div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
