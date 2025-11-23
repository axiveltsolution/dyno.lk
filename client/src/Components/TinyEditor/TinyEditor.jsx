import { Editor } from "@tinymce/tinymce-react";

// TinyMCE self-hosted imports
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";

// Common plugins
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/preview";

// Editor skin + content CSS
import "tinymce/skins/ui/oxide/skin.min.css";

export default function TinyEditor({ value, onChange }) {
  return (
    <Editor
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 350,
        menubar: false,
        plugins: ["link", "lists", "table", "image", "code", "preview"],
        toolbar:
          "undo redo | styles | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table | code preview",
        content_style: "body { font-family:Arial; font-size:14px }",
        branding: false,
        license_key: "gpl", // 👈 add this line for free self-hosted version
      }}
    />
  );
}
