import React, { memo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const TextEditor = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default memo(TextEditor);
