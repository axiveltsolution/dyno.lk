// Preload images configuration
// This file contains all images that need to be preloaded

// Hero section images
import heroBg1 from "../assets/HomeHero/herobg-1.jpg";
import heroBg2 from "../assets/HomeHero/herobg-2.jpg";
import heroBg3 from "../assets/HomeHero/herobg-3.jpg";

// Scooter images
import vortexSideImg from "../assets/Scooters/vortex-side.png";
import vortexFrontImg from "../assets/Scooters/vortex-front.png";
import vortexBackImg from "../assets/Scooters/vortex-back.png";
import drvSideImg from "../assets/Scooters/drv-side.jpg";
import drvFrontImg from "../assets/Scooters/drv-front.jpg";
import drvBackImg from "../assets/Scooters/drv-back.jpg";
import scoobySideImg from "../assets/Scooters/scooby_side.jpg";
import scoobyFrontImg from "../assets/Scooters/scooby_front.jpg";
import scoobyBackImg from "../assets/Scooters/scooby_back.jpg";

// Logo
import DynoLogo from "../assets/Logo/Dyno.lk-logo.png";

// External images (picsum for demo - replace with actual images in production)
const EXTERNAL_IMAGES = [
  "https://picsum.photos/1920/1080?random=101",
  "https://picsum.photos/1920/800?random=102",
];

// All images to preload - convert to strings
export const PRELOAD_IMAGES = [
  // Local images - use the imported references
  heroBg1,
  heroBg2,
  heroBg3,
  vortexSideImg,
  vortexFrontImg,
  vortexBackImg,
  drvSideImg,
  drvFrontImg,
  drvBackImg,
  scoobySideImg,
  scoobyFrontImg,
  scoobyBackImg,
  DynoLogo,
  // External images
  ...EXTERNAL_IMAGES,
];

// Export individual image arrays for specific sections
export const HERO_IMAGES = [heroBg1, heroBg2, heroBg3];
export const SCOOTER_IMAGES = [
  vortexSideImg,
  vortexFrontImg,
  vortexBackImg,
  drvSideImg,
  drvFrontImg,
  drvBackImg,
  scoobySideImg,
  scoobyFrontImg,
  scoobyBackImg,
];
export const LOGO_IMAGES = [DynoLogo];
