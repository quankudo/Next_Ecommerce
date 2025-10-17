"use client";
import React, { useState } from "react";
import { User, Send } from "lucide-react";

const AddComment = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log("Bình luận mới:", comment);
    setComment("");
  };

  return (
    <div className="mt-10 border border-gray-200 p-5 rounded-md shadow-sm">
      <h2 className="text-lg mb-4">Thêm bình luận</h2>
      <form onSubmit={handleSubmit} className="flex gap-3 items-start">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-600" />
        </div>

        {/* Input */}
        <div className="flex-1">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Viết bình luận của bạn..."
            className="w-full p-3 rounded-md border border-gray-300 resize-none transition-all"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
            >
              <Send size={16} />
              Gửi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
