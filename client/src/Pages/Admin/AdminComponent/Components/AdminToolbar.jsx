// client/src/Pages/Admin/AdminComponent/Components/AdminToolbar.jsx
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./../AdminComponents.css";

export default function AdminToolbar({
  addPath = "/admin/add-spare-parts",
  addLabel = "Add Item",
}) {
  return (
    <div className="admin-toolbar">
      <Link to={addPath} className="admin-btn admin-btn-primary">
        <Plus size={16} /> {addLabel}
      </Link>
    </div>
  );
}
