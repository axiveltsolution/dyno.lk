import { Editor } from "@tinymce/tinymce-react";

const TINYMCE_SRC =
  (import.meta.env.BASE_URL || "/") + "tinymce/tinymce.min.js";

export default function TinyEditor({
  value = "",
  onChange,
  height = 280,
  placeholder = "Type here…",
}) {
  return (
    <Editor
      tinymceScriptSrc={TINYMCE_SRC}   // self-hosted (not cloud)
      value={value || ""}
      onEditorChange={(content) => onChange?.(content)}
      init={{
        license_key: "gpl",            // 👈 REQUIRED for self-hosted community build
        height,
        menubar: false,
        branding: false,
        statusbar: false,
        placeholder,
        skin: "oxide",
        content_css: "default",
        plugins:
          "advlist autolink link lists charmap preview anchor " +
          "searchreplace visualblocks fullscreen insertdatetime " +
          "table code codesample help wordcount",
        toolbar:
          "undo redo | blocks | bold italic underline forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link | table | removeformat | code",
        block_formats: "Paragraph=p; H2=h2; H3=h3; H4=h4",
        content_style:
          "body{font-family: system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,'Noto Sans'; font-size:14px; line-height:1.65 }",
        mobile: {
          menubar: false,
          toolbar:
            "undo redo | bold italic underline | forecolor backcolor | " +
            "bullist numlist | alignleft aligncenter alignright | link",
        },
      }}
    />
  );
}
