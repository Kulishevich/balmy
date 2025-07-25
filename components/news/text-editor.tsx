"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Импортируем без SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TextEditor() {
  const [value, setValue] = useState("");

  return (
    <div className="p-4 bg-white rounded-md">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}
