import React from "react";

export default function ProductViewer({ url }) {
  return (
    <div style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}>
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="360 Product View"
      />
    </div>
  );
}
