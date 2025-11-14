import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function ElectricalDetail(){
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    async function load(){
      setLoading(true);
      try {
        const res = await fetch(`${API}/electricals/${slug}`);
        const json = await res.json();
        setItem(json.item || null);
      } catch(err){ console.error(err); }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <div className="loader"><div className="spinner"/></div>;
  if (!item) return <div className="empty">Accessory not found</div>;

  return (
    <article className="part-detail">
      <h1>{item.title}</h1>
      <div className="meta muted small">Category: {item.category || "—"} • Type: {item.type || "—"} • Price: {item.price ? `LKR ${item.price}` : "—"}</div>

      <div className="gallery">
        {item.coverImage && <img src={`${API}${item.coverImage}`} alt={item.title} />}
        {item.images && item.images.map((im,i)=> <img key={i} src={`${API}${im}`} alt={`${item.title} ${i+1}`} />)}
      </div>

      <div className="description" dangerouslySetInnerHTML={{ __html: item.description || "<p>No description</p>" }} />
    </article>
  );
}
