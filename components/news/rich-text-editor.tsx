"use client";

import ReactQuill from "react-quill-new"; // 👈 Новый пакет
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  return (
    <ReactQuill
      className="h-[400px] w-full bg-white rounded-[5px] overflow-hidden text-dark-grey"
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          // [{ header: [1, 2, 3, 4, 5, 6, false] }],
          // ["bold", "italic", "underline", "strike"],
          // [{ color: [] }, { background: [] }],
          // [{ script: "sub" }, { script: "super" }],
          // ["blockquote", "code-block"],
          // [{ list: "ordered" }, { list: "bullet" }],
          // [{ indent: "-1" }, { indent: "+1" }],
          // [{ direction: "rtl" }],
          // [{ size: ["small", false, "large", "huge"] }],
          // [{ font: [] }],
          // [{ align: [] }],
          // ["link", "image", "video"],
          // ["clean"],

          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image"],
        ],
      }}
    />
  );
};
