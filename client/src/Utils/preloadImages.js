// Preload images configuration
// This file contains all images that need to be preloaded

// Hero section images
import heroBg1 from "../assets/HomeHero/herobg-1.jpg";
import heroBg2 from "../assets/HomeHero/herobg-2.jpg";
import heroBg3 from "../assets/HomeHero/herobg-3.jpg";

// Mobile/Tablet hero images
import heroBgMobile1 from "../assets/HomeHero/herobg-4.jpeg";
import heroBgMobile2 from "../assets/HomeHero/herobg-5.jpeg";
import heroBgMobile3 from "../assets/HomeHero/herobg-6.jpeg";

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

// Vortex 360 images
import vortex360_0 from "../assets/360/votex125/0_0.webp";
import vortex360_1 from "../assets/360/votex125/0_1.webp";
import vortex360_2 from "../assets/360/votex125/0_2.webp";
import vortex360_3 from "../assets/360/votex125/0_3.webp";
import vortex360_4 from "../assets/360/votex125/0_4.webp";
import vortex360_5 from "../assets/360/votex125/0_5.webp";
import vortex360_6 from "../assets/360/votex125/0_6.webp";
import vortex360_7 from "../assets/360/votex125/0_7.webp";
import vortex360_8 from "../assets/360/votex125/0_8.webp";
import vortex360_9 from "../assets/360/votex125/0_9.webp";
import vortex360_10 from "../assets/360/votex125/0_10.webp";
import vortex360_11 from "../assets/360/votex125/0_11.webp";
import vortex360_12 from "../assets/360/votex125/0_12.webp";
import vortex360_13 from "../assets/360/votex125/0_13.webp";
import vortex360_14 from "../assets/360/votex125/0_14.webp";
import vortex360_15 from "../assets/360/votex125/0_15.webp";
import vortex360_16 from "../assets/360/votex125/0_16.webp";
import vortex360_17 from "../assets/360/votex125/0_17.webp";
import vortex360_18 from "../assets/360/votex125/0_18.webp";

// DRV 360 images
import drv360_0 from "../assets/360/drv125/0_0.webp";
import drv360_1 from "../assets/360/drv125/0_1.webp";
import drv360_2 from "../assets/360/drv125/0_2.webp";
import drv360_3 from "../assets/360/drv125/0_3.webp";
import drv360_4 from "../assets/360/drv125/0_4.webp";
import drv360_5 from "../assets/360/drv125/0_5.webp";
import drv360_6 from "../assets/360/drv125/0_6.webp";
import drv360_7 from "../assets/360/drv125/0_7.webp";
import drv360_8 from "../assets/360/drv125/0_8.webp";
import drv360_9 from "../assets/360/drv125/0_9.webp";
import drv360_10 from "../assets/360/drv125/0_10.webp";
import drv360_11 from "../assets/360/drv125/0_11.webp";
import drv360_12 from "../assets/360/drv125/0_12.webp";
import drv360_13 from "../assets/360/drv125/0_13.webp";
import drv360_14 from "../assets/360/drv125/0_14.webp";
import drv360_15 from "../assets/360/drv125/0_15.webp";

// Scooby 360 images
import scooby360_0 from "../assets/360/scooby/0_0.webp";
import scooby360_1 from "../assets/360/scooby/0_1.webp";
import scooby360_2 from "../assets/360/scooby/0_2.webp";

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
  heroBgMobile1,
  heroBgMobile2,
  heroBgMobile3,
  vortexSideImg,
  vortexFrontImg,
  vortexBackImg,
  vortex360_0, vortex360_1, vortex360_2, vortex360_3,
  vortex360_4, vortex360_5, vortex360_6, vortex360_7,
  vortex360_8, vortex360_9, vortex360_10, vortex360_11,
  vortex360_12, vortex360_13, vortex360_14, vortex360_15,
  vortex360_16, vortex360_17, vortex360_18,
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
export const MOBILE_HERO_IMAGES = [heroBgMobile1, heroBgMobile2, heroBgMobile3];
export const ALL_HERO_IMAGES = [heroBg1, heroBg2, heroBg3, heroBgMobile1, heroBgMobile2, heroBgMobile3];
export const SCOOTER_IMAGES = [
  vortexSideImg,
  vortexFrontImg,
  vortexBackImg,
  vortex360_0, vortex360_1, vortex360_2, vortex360_3,
  vortex360_4, vortex360_5, vortex360_6, vortex360_7,
  vortex360_8, vortex360_9, vortex360_10, vortex360_11,
  vortex360_12, vortex360_13, vortex360_14, vortex360_15,
  vortex360_16, vortex360_17, vortex360_18,
  drv360_0, drv360_1, drv360_2, drv360_3,
  drv360_4, drv360_5, drv360_6, drv360_7,
  drv360_8, drv360_9, drv360_10, drv360_11,
  drv360_12, drv360_13, drv360_14, drv360_15,
  scooby360_0, scooby360_1, scooby360_2,
  drvSideImg,
  drvFrontImg,
  drvBackImg,
  scoobySideImg,
  scoobyFrontImg,
  scoobyBackImg,
];
export const LOGO_IMAGES = [DynoLogo];
