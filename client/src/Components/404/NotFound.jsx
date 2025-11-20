import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <h1 className="notfound-heading">404</h1>
      <p className="notfound-subtitle">Page not found</p>
      <Link to="/" className="notfound-button">
        Go Home
      </Link>
    </div>
  );
}
