import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Box, Info } from "lucide-react";

import "./ElectricalAccessories.css"; // Reuse scoped CSS
import CommonHero from "../../../Components/CommonHero/CommonHero";
import PurchaseButton from "../../../Components/PurchaseButton/PurchaseButton";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const CRC_API_BASE = API_BASE.replace(/\/api$/, "");

const DETAIL_BG = "https://picsum.photos/1920/1080?random=95";

export default function ElectricalDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/electricals/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setItem(json.item || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading)
    return (
      <div className="electrical-page-wrapper">
        <div className="loading-state">Loading product...</div>
      </div>
    );
  if (!item)
    return (
      <div className="electrical-page-wrapper">
        <div className="empty-state">Product not found.</div>
      </div>
    );

  const displayImages = [];
  if (item.coverImage) displayImages.push(item.coverImage);
  if (item.images && item.images.length > 0) displayImages.push(...item.images);

  const itemForCart = {
    ...item,
    images: displayImages.map((img) => `${CRC_API_BASE}${img}`),
  };

  const hasDescription =
    item.description &&
    item.description.trim() !== "" &&
    item.description !== "<p><br></p>";

  return (
    <div className="electrical-page-wrapper">
      <CommonHero
        title={item.title}
        subtitle={item.category || "Electrical Component"}
        bgImage={DETAIL_BG}
        parentPage="Electricals"
      />

      <div className="container content-container">
        <div className="breadcrumbs-area">
          <Link to="/electricals" className="back-nav-link">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        <div className="detail-layout">
          {/* Left: Gallery */}
          <div className="detail-gallery">
            {displayImages.length > 0 ? (
              <>
                <div className="primary-image">
                  <img
                    src={`${CRC_API_BASE}${displayImages[0]}`}
                    alt={item.title}
                  />
                </div>
                {displayImages.length > 1 && (
                  <div className="thumbs-list">
                    {displayImages.slice(1).map((img, idx) => (
                      <img
                        key={idx}
                        src={`${CRC_API_BASE}${img}`}
                        alt="thumbnail"
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="no-image-large">
                <Box size={40} /> No Images
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="detail-info">
            <h1 className="info-title">{item.title}</h1>
            <div className="info-price">
              {item.price ? `LKR ${item.price}` : "Price TBD"}
            </div>

            <div className="meta-row">
              {item.category && (
                <span className="meta-badge">Category: {item.category}</span>
              )}
              {item.type && (
                <span className="meta-badge">Type: {item.type}</span>
              )}
            </div>

            {/* Description or Placeholder */}
            <div className="desc-block">
              <h3>Description</h3>
              {hasDescription ? (
                <div
                  className="desc-content"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ) : (
                <div className="desc-missing">
                  <Info size={20} />
                  <p>
                    {item.excerpt ||
                      "No detailed description available for this item."}
                  </p>
                </div>
              )}
            </div>

            <div className="action-row">
              <PurchaseButton item={itemForCart} itemType="electrical" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
