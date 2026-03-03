import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import ImagePreloader from "./Components/ImagePreloader/ImagePreloader.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImagePreloader minLoadTime={1500}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </ImagePreloader>
  </StrictMode>
);
