import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Box } from "lucide-react";

import "./AutomotiveParts.css";
import CommonHero from "../../../Components/CommonHero/CommonHero";
import PurchaseButton from "../../../Components/PurchaseButton/PurchaseButton";
import { API_BASE, getImageUrl } from "../../../Utils/config";

const PART_BG = "https://picsum.photos/1920/1080?random=302";

export default function PartPage() {
  const { bikeSlug, partSlug } = useParams();
  const [part, setPart] = useState(null);
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bikeSlug || !partSlug) return;
    setLoading(true);
    fetch(`${API_BASE}/spares/bikes/${bikeSlug}/parts/${partSlug}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.part) setPart(json.part);
        if (json.bike) setBike(json.bike);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [bikeSlug, partSlug]);

  if (loading) return <div className="dyno-loader">Loading part...</div>;
  if (!part) return <div className="dyno-empty">Part not found.</div>;

  const itemForCart = {
    ...part,
    images: part.images ? part.images.map((i) => getImageUrl(i)) : [],
  };

  return (
    <div className="dyno-auto-parts-page">
      {/* 1. HERO */}
      <CommonHero
        title={part.title}
        subtitle={`Compatible with ${bike?.name || bikeSlug}`}
        bgImage={PART_BG}
        parentPage={bike?.name || "Vehicle"}
      />

      <div className="container dyno-parts-container">
        <div className="dyno-breadcrumbs">
          <Link to={`/spares/bike/${bikeSlug}`} className="back-link">
            <ArrowLeft size={16} /> Back to {bike?.name}
          </Link>
        </div>

        <div className="dyno-part-detail-layout">
          {/* Left: Gallery */}
          <div className="dyno-part-gallery">
            {part.images && part.images.length > 0 ? (
              <div className="main-image-box">
                <img
                  src={getImageUrl(part.images[0])}
                  alt={part.title}
                />
              </div>
            ) : (
              <div className="no-image-box">
                <Box size={40} /> No Images
              </div>
            )}

            {/* Thumbnails if needed */}
            {part.images && part.images.length > 1 && (
              <div className="thumbnails-row">
                {part.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(img)}
                    alt="thumbnail"
                    className="thumbnail"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="dyno-part-info">
            <h1 className="part-title">{part.title}</h1>
            <div className="part-price-tag">
              {part.price ? `LKR ${part.price}` : "Contact for Price"}
            </div>

            <div
              className="part-desc-html"
              dangerouslySetInnerHTML={{
                __html:
                  part.description ||
                  "<p>No detailed description available.</p>",
              }}
            />

            <div className="part-buy-action">
              <PurchaseButton item={itemForCart} itemType="spare-part" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
