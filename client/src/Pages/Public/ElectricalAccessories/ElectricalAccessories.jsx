// src/Pages/Public/Electricals/ElectricalAccessories.jsx
import React, { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import SectionHero from "../Components/SectionHero";
import HeroBg from "../../../assets/HomeHero/herobg-1.webp";
import "./ElectricalAccessories.css";

// === ALL IMAGES ===
import sq1 from "../../../assets/electrical/junction box/junction-square1.jpg";
import sq2 from "../../../assets/electrical/junction box/junction-square2.jpg";
import sq3 from "../../../assets/electrical/junction box/junction-square3.jpg";

import rd1 from "../../../assets/electrical/junction box/junction-round1.jpg";
import rd2 from "../../../assets/electrical/junction box/junction-round2.jpg";
import rd3 from "../../../assets/electrical/junction box/junction-round3.jpg";

import sn1 from "../../../assets/electrical/Sunk box/sunk-single-normal1.jpg";
import sn2 from "../../../assets/electrical/Sunk box/sunk-single-normal2.jpg";
import sn3 from "../../../assets/electrical/Sunk box/sunk-single-normal3.jpg";

import sd1 from "../../../assets/electrical/Sunk box/sunk-single-deep1.jpg";
import sd2 from "../../../assets/electrical/Sunk box/sunk-single-deep2.jpg";
import sd3 from "../../../assets/electrical/Sunk box/sunk-single-deep3.jpg";

import db1 from "../../../assets/electrical/Sunk box/sunk-double1.jpg";
import db2 from "../../../assets/electrical/Sunk box/sunk-double2.jpg";
import db3 from "../../../assets/electrical/Sunk box/sunk-double3.jpg";

const products = [
  { title: "Junction Box – Square", desc: "High-quality PVC square junction box for secure wiring connections.", images: [sq1, sq2, sq3] },
  { title: "Junction Box – Round", desc: "Compact round design with multiple entry points. Ideal for ceiling installations.", images: [rd1, rd2, rd3,] },
  { title: "Sunk Box Single – Normal", desc: "Standard depth flush-mount box for switches and sockets.", images: [sn1, sn2, sn3] },
  { title: "SUNK BOX Single – Deep", desc: "Extra depth for complex wiring and larger devices.", images: [sd1, sd2, sd3] },
  { title: "Sunk Box – Double", desc: "Double gang box for dual switches or sockets.", images: [db1, db2, db3] },
];

const ElectricalAccessories = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const refs = useRef([]);

  const allImages = products.flatMap(p => p.images.map(src => ({ src })));

  const openLightbox = (startIdx) => {
    setIndex(startIdx);
    setOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach(ref => ref && observer.observe(ref));
    return () => refs.current.forEach(ref => ref && observer.unobserve(ref));
  }, []);

  return (
    <>
      <SectionHero
        bgImage={HeroBg}
        title="Electrical Accessories"
        description="Premium Junction & Sunk Boxes"
      />

      {/* JUNCTION BOX */}
      <section className="ea-section">
        <div className="ea-container">
          <div className="ea-header" ref={el => refs.current[0] = el}>
            <h2 className="ea-title">Junction Box</h2>
            <div className="ea-line"></div>
          </div>

          <div className="ea-grid">
            {products.slice(0, 2).map((p, i) => (
              <div key={i} className="ea-card" ref={el => refs.current[i + 1] = el}>
                <h3 className="ea-card-title">{p.title}</h3>
                <p className="ea-card-desc">{p.desc}</p>
                <div className="ea-gallery">
                  {p.images.map((img, idx) => {
                    const globalIdx = products.slice(0, i).reduce((a, pr) => a + pr.images.length, 0) + idx;
                    return (
                      <div key={idx} className="ea-photo-wrapper">
                        <img
                          src={img}
                          alt={p.title}
                          className="ea-photo"
                          onClick={() => openLightbox(globalIdx)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUNK BOX */}
      <section className="ea-section alt">
        <div className="ea-container">
          <div className="ea-header" ref={el => refs.current[10] = el}>
            <h2 className="ea-title">Sunk Box</h2>
            <div className="ea-line"></div>
          </div>

          <div className="ea-grid">
            {products.slice(2).map((p, i) => (
              <div key={i} className="ea-card" ref={el => refs.current[i + 11] = el}>
                <h3 className="ea-card-title">{p.title}</h3>
                <p className="ea-card-desc">{p.desc}</p>
                <div className="ea-gallery">
                  {p.images.map((img, idx) => {
                    const globalIdx = products.slice(0, i + 2).reduce((a, pr) => a + pr.images.length, 0) + idx;
                    return (
                      <div key={idx} className="ea-photo-wrapper">
                        <img
                          src={img}
                          alt={p.title}
                          className="ea-photo"
                          onClick={() => openLightbox(globalIdx)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={allImages}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ position: "bottom" }}
      />
    </>
  );
};

export default ElectricalAccessories;