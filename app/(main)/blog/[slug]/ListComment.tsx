"use client";
import React, { useState } from "react";
import { User, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import AddComment from "./AddComment";

interface Comment {
  id: number;
  author: string;
  time: string;
  content: string;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Nguyễn Văn A",
    time: "2 giờ trước",
    content: "Bài viết rất hay và hữu ích!",
    replies: [
      {
        id: 2,
        author: "Trần Thị B",
        time: "1 giờ trước",
        content: "Cảm ơn bạn nhé!",
        replies: [
          {
            id: 3,
            author: "Nguyễn Văn C",
            time: "30 phút trước",
            content: "Chuẩn luôn, mình cũng thấy rất hữu ích!",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    author: "Hoàng D",
    time: "3 giờ trước",
    content: "Có ai biết mua ở đâu không?",
  },
];

const CommentItem = ({
  comment,
  level = 1,
  replyToId,
  setReplyToId,
}: {
  comment: Comment;
  level?: number;
  replyToId: number | null;
  setReplyToId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleReplyClick = () => {
    if (replyToId === comment.id) {
      setReplyToId(null); // nếu đang reply thì ẩn đi
    } else {
      setReplyToId(comment.id);
    }
  };

  return (
    <div className={`flex flex-col mt-4 ${level > 1 ? "ml-10" : ""}`}>
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{comment.author}</span>
            <span className="text-sm text-gray-500">{comment.time}</span>
          </div>
          <p className="text-gray-700 mt-1">{comment.content}</p>

          <button
            onClick={handleReplyClick}
            className={`text-sm mt-1 flex items-center gap-1 hover:underline ${
              replyToId === comment.id
                ? "text-blue-700 font-semibold"
                : "text-blue-600"
            }`}
          >
            <MessageSquare size={14} />
            {replyToId === comment.id ? "Đang trả lời..." : "Trả lời"}
          </button>

          {/* Xem/ẩn phản hồi */}
          {comment.replies && comment.replies.length > 0 && level < 3 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-sm text-gray-500 mt-2 flex items-center gap-1 hover:text-blue-500"
            >
              {showReplies ? (
                <>
                  Ẩn phản hồi <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Xem {comment.replies.length} phản hồi{" "}
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          )}

          {/* AddComment hiển thị dưới comment đang reply */}
          {replyToId === comment.id && (
            <div className="mt-3">
              <AddComment />
            </div>
          )}

          {/* Hiển thị các phản hồi (cấp 2 - 3) */}
          {showReplies && comment.replies && (
            <div className="mt-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  level={level + 1}
                  replyToId={replyToId}
                  setReplyToId={setReplyToId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ListComment = () => {
  const [replyToId, setReplyToId] = useState<number | null>(null);

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-5">(10) Bình luận</h2>
      {mockComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replyToId={replyToId}
          setReplyToId={setReplyToId}
        />
      ))}

      {/* Nếu không đang reply comment nào thì mới hiển thị ô AddComment chính */}
      {!replyToId && <AddComment />}
    </div>
  );
};

export default ListComment;
