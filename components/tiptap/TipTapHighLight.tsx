import { Editor } from "@tiptap/react";
import React from "react";

interface TipTapHighLightProps {
  editor: Editor;
}

const colors = [
  { name: "Yellow", color: "#ffc078" },
  { name: "Green", color: "#8ce99a" },
  { name: "Blue", color: "#74c0fc" },
  { name: "Purple", color: "#b197fc" },
  { name: "Red", color: "#ffa8a8" },
];

const TipTapHighLight: React.FC<TipTapHighLightProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Toggle default highlight */}
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center 
          ${
            editor.isActive("highlight")
              ? "border-black bg-yellow-200"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        title="Highlight default"
      >
        ✨
      </button>

      {/* Color buttons */}
      {colors.map((c) => (
        <button
          key={c.color}
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: c.color }).run()
          }
          className={`w-8 h-8 rounded-full border-2 transition 
            ${
              editor.isActive("highlight", { color: c.color })
                ? "ring-2 ring-offset-1 ring-black border-black"
                : "border-gray-300 hover:scale-110"
            }`}
          style={{ backgroundColor: c.color }}
          title={c.name}
        />
      ))}

      {/* Unset */}
      <button
        onClick={() => editor.chain().focus().unsetHighlight().run()}
        disabled={!editor.isActive("highlight")}
        className={`w-8 h-8 flex items-center justify-center border rounded-full 
          ${
            editor.isActive("highlight")
              ? "border-gray-400 text-gray-700 hover:bg-gray-100"
              : "border-gray-200 text-gray-400"
          }`}
        title="Remove highlight"
      >
        ❌
      </button>
    </div>
  );
};

export default TipTapHighLight;