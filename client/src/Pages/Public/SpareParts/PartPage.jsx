import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.css';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:7001/api';
const CRC_API_BASE = API.replace(/\/api$/, '');   // <-- removes "/api"

export default function PartPage() {
  const { bikeSlug, partSlug } = useParams();
  const [part, setPart] = useState(null);
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bikeSlug || !partSlug) return;
    setLoading(true);
    fetch(`${API}/spares/bikes/${bikeSlug}/parts/${partSlug}`)
      .then(r => r.json())
      .then(json => {
        if (json.part) setPart(json.part);
        if (json.bike) setBike(json.bike);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [bikeSlug, partSlug]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!part) return <div className="empty">Part not found.</div>;

  return (
    <div className="container container-tight">
      <div className="breadcrumbs">
        <Link to="/spares">Spare Parts</Link> ▸{' '}
        <Link to={`/spares/bike/${bikeSlug}`}>{bike?.name || bikeSlug}</Link> ▸{' '}
        <span>{part.title}</span>
      </div>

      <article className="part-detail">
        <h1>{part.title}</h1>
        <div className="meta">
          Bike: {bike?.name || bikeSlug} • Price:{' '}
          {part.price ? `LKR ${part.price}` : '—'}
        </div>

        <div className="gallery">
          {part.images && part.images.length ? (
            part.images.map((img, idx) => (
              <img
                key={idx}
                src={`${CRC_API_BASE}${img}`}
                alt={`${part.title} ${idx + 1}`}
              />
            ))
          ) : (
            <div className="no-image">No images</div>
          )}
        </div>

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: part.description || '<p>No description</p>'
          }}
        />
      </article>
    </div>
  );
}