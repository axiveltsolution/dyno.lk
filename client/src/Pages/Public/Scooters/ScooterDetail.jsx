import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CapabilitiesContact from "../Home/sections/CapabilitiesContact";
import "./ScooterDetail.css";

const scooterData = {
  1: {
    name: "Arena 125",
    images: [
      "/src/assets/Scooters/arena125_front.jpg",
      "/src/assets/Scooters/arena125_back.jpg",
      "/src/assets/Scooters/arena125_side.jpg"
    ],
    specs: {
      "ENGINE": {
        "Type": "Single cylinder, four stroke, air cooled, EURO 4 EFI engine",
        "Displacement(cm3)": "124.6cc",
        "bore x stroke": "52.4×57.8mm",
        "Fuel System": "Electronic Fuel injection",
        "Ignition System": "ECU",
        "Starting": "Electric start / Kick Start",
        "Compression ratio": "9.2:1",
        "Max.Torque": "7.3N.m @ 6000 RPM",
        "Max.Power": "5.6kW @ 7500 RPM"
      },
      "CHASSIS": {
        "L x W x H": "1850×860×1270 mm",
        "Wheel base": "1280 mm",
        "Ground Clearance": "130 mm",
        "Brakes (Front/Rear)": "Front: Disk , Rear: Drum",
        "Tires (Front / Rear)": "Front: 100/80-12 , Rear: 100/80-12",
        "Wheel Size (Front / Rear)": "2.5-12",
        "Fuel Capacity": "6 L",
        "Kerb Weight": "108 kg",
        "Payload": "150 kg",
        "Max.Speed": "85 km/h",
        "Seat Hight": "770mm",
        "Suspension": "Front: Telescopic shock absorbers / Rear: Mono shock absorber"
      }
    }
  },
  2: {
    name: "Elvissa",
    images: [
      "/src/assets/Scooters/elvissa_front.jpg",
      "/src/assets/Scooters/elvissa_side.jpg"
    ],
    specs: {
      "BATTERY": {
        "Battery Concept": "Lithium",
        "Battery Capacity": "60V26Ah",
        "Charging Time(h)": "6",
        "Life Cycle": "1000",
        "Charge Input Voltage": "110V/220V",
        "Maximum Power": "2000W",
        "Maximum Speed Km/h": "60",
        "Distance Range( Km)": "70",
        "Climbing Capacity(75kg )": "15%",
        "Weight(Kg)": "90",
        "Tyres": "120/70-12",
        "Brakes (Front/Rear)": "Disc/Disc",
        "Dimension(mm)": "1900*670*1125",
        "Wheelbase(mm)": "1320",
        "Ground Clearance(mm)": "125",
        "Maximum load(including passenger) (Kg)": "150"
      }
    }
  },
  3: {
    name: "Scooby",
    images: [
      "/src/assets/Scooters/scooby_front.jpg",
      "/src/assets/Scooters/scooby_back.jpg",
      "/src/assets/Scooters/scooby_side.jpg"
    ],
    specs: {
      "ENGINE": {
        "Engine Type": "Single cylinder, Four stroke, Air cooled, EURO 4, EFI engine",
        "Displacement (CC)": "124.6",
        "bore x Stroke (mm)": "52.4×57.8",
        "Fuel System": "Electronic Fuel Injection (EFI)",
        "Ignition System": "ECU",
        "Starting": "Electric / Kick Start",
        "Compression Ratio": "9.2:1",
        "Max. Torque": "7.3Nm @ 6000 RPM",
        "Max. Power": "5.6kW @ 7500 RPM"
      },
      "CHASSIS": {
        "L x W x H (mm)": "2025×860×1290",
        "Wheelbase (mm)": "1420",
        "Ground Clearance (mm)": "150",
        "Brakes (Front/Rear)": "Disc/ Drum",
        "Tyres": "Front: 110/80-12\nRear: 110/80-12 (Tubeless)",
        "Wheel Size (Front/ Rear)": "2.5 – 12″",
        "Fuel Tank Capacity (L)": "5",
        "Kerb Weight (kg)": "110",
        "Max. Speed (Km/h)": "85",
        "Sadle Height (mm)": "800",
        "Suspension": "Front: Telescopic shock absorbers\nRear: Double shock absorbers"
      }
    }
  },
  4: {
    name: "Vortex",
    images: [
      "/src/assets/Scooters/vortex_front.jpg",
      "/src/assets/Scooters/vortex_back.jpg",
      "/src/assets/Scooters/vortex_side.jpg"
    ],
    specs: {
      "ENGINE": {
        "Type": "Single cylinder, four stroke, Liquid cooled, EURO 4 EFI engine",
        "Displacement(cm3)": "124.6cc",
        "bore x stroke": "52.4×57.8mm",
        "Fuel System": "Electronic Fuel injection",
        "Ignition System": "ECU",
        "Starting": "Electric start",
        "Compression ratio": "9.2:1",
        "Max.Torque": "7.3N.m @ 6000 RPM",
        "Max.Power": "5.6kW @ 7500 RPM"
      },
      "CHASSIS": {
        "L x W x H": "1960×790×1280 mm",
        "Wheel base": "1350 mm",
        "Ground Clearance": "80 mm",
        "Brakes (Front/Rear)": "Front: Disk , Rear: Disc",
        "Tires (Front / Rear)": "110/80-14,120/70-14",
        "Wheel Size (Front / Rear)": "3.5-14",
        "Fuel Capacity": "6 L",
        "Kerb Weight": "129kg",
        "Payload": "150 kg",
        "Max.Speed": "110km/h",
        "Seat Hight": "750mm",
        "Suspension": "Front: Telescopic shock absorbers / Rear: Double shock absorbers"
      }
    }
  },
  5: {
    name: "Yage 125",
    images: [
      "/src/assets/Scooters/yage125_front.jpg",
      "/src/assets/Scooters/yage125_back.jpg",
      "/src/assets/Scooters/yage125_side.jpg"
    ],
    specs: {
      "ENGINE": {
        "Type": "Single cylinder, four stroke, air cooled, EURO 4 EFI engine",
        "Displacement(cm3)": "124.6cc",
        "bore x stroke": "52.4×57.8mm",
        "Fuel System": "Fuel injection",
        "Ignition System": "ECU",
        "Starting": "Electric start / Kick Start",
        "Compression ratio": "9.2:1",
        "Max.Torque": "7.3N.m @ 6000 RPM",
        "Max.Power": "5.6kW @ 7500 RPM"
      },
      "CHASSIS": {
        "L x W x H": "1800×685×1190 mm",
        "Wheel base": "1250 mm",
        "Ground Clearance": "115 mm",
        "Brakes (Front/Rear)": "Front: Disk , Rear: Drum",
        "Tires (Front / Rear)": "Front: 350-10 , Rear: 350-10",
        "Wheel Size (Front / Rear)": "3.5-12",
        "Fuel Capacity": "6 L",
        "Kerb Weight": "90 kg",
        "Payload": "150 kg",
        "Max.Speed": "85 km/h",
        "Seat Hight": "730mm",
        "Suspension": "Front: Telescopic shock absorbers / Rear: Mono shock absorber"
      }
    }
  }
};

export default function ScooterDetail() {
  const { id } = useParams();
  const scooter = scooterData[id];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  if (!scooter) {
    return <div>Scooter not found</div>;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setImageOpacity(0);

      // After fade out, change image and fade in
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % scooter.images.length);
        setImageOpacity(1);
      }, 500); // Half of transition time

    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [scooter.images.length]);

  return (
    <div className="scooter-detail">
      <div className="scooter-detail-content container">
        <motion.h1
          className="scooter-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {scooter.name}
        </motion.h1>

        <motion.div
          className="scooter-carousel"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <motion.img
            src={scooter.images[currentImageIndex]}
            alt={`${scooter.name} view ${currentImageIndex + 1}`}
            className="scooter-image"
            style={{ opacity: imageOpacity }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="scooter-specs"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.8
              }
            }
          }}
        >
          {Object.entries(scooter.specs).map(([category, specs]) => (
            <motion.div
              key={category}
              className="spec-category"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="spec-category-title">{category}</h2>
              <table className="spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <CapabilitiesContact />
    </div>
  );
}