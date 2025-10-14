import { Editor } from "@tiptap/react";
import React from "react";
import {
  List,
  ListOrdered,
  Indent,
  Outdent,
  SplitSquareHorizontal,
} from "lucide-react"; // dùng icon từ lucide-react (nhẹ & phổ biến)

interface TipTapListItemProps {
  editor: Editor | null;
  btnStyle: (active: boolean) => string;
}

const TipTapListItem: React.FC<TipTapListItemProps> = ({
  editor,
  btnStyle,
}) => {
  if (!editor) return null;

  return (
    <div className="flex gap-1">
      {/* Bullet List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnStyle(editor.isActive("bulletList"))}
        title="Danh sách gạch đầu dòng"
      >
        <List size={16} />
      </button>

      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnStyle(editor.isActive("orderedList"))}
        title="Danh sách số thứ tự"
      >
        <ListOrdered size={16} />
      </button>

      {/* Split List Item */}
      <button
        onClick={() => editor.chain().focus().splitListItem("listItem").run()}
        disabled={!editor.can().splitListItem("listItem")}
        className={btnStyle(false)}
        title="Tách mục danh sách"
      >
        <SplitSquareHorizontal size={16} />
      </button>

      {/* Sink List Item (thụt vào) */}
      <button
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        disabled={!editor.can().sinkListItem("listItem")}
        className={btnStyle(false)}
        title="Thụt vào"
      >
        <Indent size={16} />
      </button>

      {/* Lift List Item (lùi ra ngoài) */}
      <button
        onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        disabled={!editor.can().liftListItem("listItem")}
        className={btnStyle(false)}
        title="Lùi ra"
      >
        <Outdent size={16} />
      </button>
    </div>
  );
};

export default TipTapListItem;