"use client";

import React, { useState, ChangeEvent } from "react";
import { Editor } from "@tiptap/react";

interface TipTapImageProps {
  editor: Editor | null; // kiểu từ Tiptap
  btnStyle: (active: boolean) => string;
}

const ImageButton: React.FC<TipTapImageProps> = ({ editor, btnStyle }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleInsert = async () => {
    let src = imageUrl.trim();
    if (!src && !file) return;

    // Nếu có file, upload file lên server hoặc cloud (Cloudinary / API backend)
    if (file) {
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        src = data.url;
      } catch (err) {
        console.error(err);
        alert("Lỗi khi upload ảnh");
        return;
      } finally {
        setIsUploading(false);
      }
    }

    // Chèn ảnh vào editor
    if (src) {
      editor.chain().focus().setImage({ src }).run();
      setShowModal(false);
      setImageUrl("");
      setFile(null);
    }
  };

  return (
    <>
      {/* Nút mở modal */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={btnStyle(editor.isActive("image"))}
      >
        🖼 Ảnh
      </button>

      {/* Modal thêm ảnh */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Thêm ảnh vào bài viết</h3>

            <label className="block mb-2 text-sm font-medium">Nhập URL ảnh:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border rounded w-full px-2 py-1 mb-4 text-sm"
            />

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-medium">Hoặc tải ảnh lên:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {file && (
                <p className="text-xs text-gray-500">Đã chọn: {file.name}</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleInsert}
                disabled={isUploading}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm disabled:opacity-60"
              >
                {isUploading ? "Đang tải..." : "Chèn ảnh"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageButton;