import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Scooters.css";

const scooters = [
  {
    id: 1,
    name: "Arena 125",
    image: "/src/assets/Scooters/arena125_front.jpg"
  },
  {
    id: 2,
    name: "Elvissa",
    image: "/src/assets/Scooters/elvissa_front.jpg"
  },
  {
    id: 3,
    name: "Scooby",
    image: "/src/assets/Scooters/scooby_front.jpg"
  },
  {
    id: 4,
    name: "Vortex",
    image: "/src/assets/Scooters/vortex_front.jpg"
  },
  {
    id: 5,
    name: "Yage 125",
    image: "/src/assets/Scooters/yage125_front.jpg"
  }
];

export default function Scooters() {
  return (
    <div className="scooters container">
      <motion.div
        className="page-head"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>Scooters</h1>
        <p className="muted">
          Discover our range of high-quality scooters designed for performance and reliability.
        </p>
      </motion.div>

      <motion.section
        className="grid scooters-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3
            }
          }
        }}
      >
        {scooters.map((scooter) => (
          <motion.div
            key={scooter.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={`/scooters/${scooter.id}`} className="scooter-item-link">
              <div className="scooter-item">
                <img src={scooter.image} alt={scooter.name} />
                <h3>{scooter.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}