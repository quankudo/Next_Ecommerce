"use client";

import React, { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Edit, GripVertical, Trash } from "lucide-react";
import SectionHeading from "@/components/admin/SectionHeading";
import { createPortal } from "react-dom";
import AddCategoryForm from "./AddCategoryForm";
import Swal from "sweetalert2";

// ---- Kiểu dữ liệu ----
export type Category = {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive";
  displayOrder: number;
  imageUrl?: string;
  slug: string;
};

// ---- Item có thể kéo thả ----
function SortableCategoryItem({ item, isOverlay = false, setCategory }: { item: Category; isOverlay?: boolean, setCategory: React.Dispatch<React.SetStateAction<Category | null>> }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClickUpdate = () => {
    setCategory(item);
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg border border-gray-300 p-3 bg-white shadow-sm transition
        ${isDragging && !isOverlay ? "ring-2 ring-blue-500 opacity-50" : ""}
        ${isOverlay ? "shadow-lg ring-2 ring-blue-400" : ""}`}
    >
      {/* Handle kéo thả */}
      <button
        className="cursor-grab active:cursor-grabbing p-2 rounded-lg hover:bg-gray-50"
        {...attributes}
        {...listeners}
        aria-label="Drag"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* Hình ảnh */}
      <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400">No Img</span>
        )}
      </div>

      {/* Nội dung */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium truncate">{item.name}</p>
          <span
            className={`px-2 py-0.5 text-xs rounded ${
              item.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {item.status === "active" ? "Hoạt động" : "Ngừng"}
          </span>
          <span className="text-xs text-gray-500">#{item.displayOrder}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {item.description || "(Không có mô tả)"}
        </p>
        <p className="text-xs text-gray-500 mt-1">Slug: {item.slug}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={()=> handleClickUpdate()}
          className="cursor-pointer px-3 py-1 rounded bg-blue-200 text-blue-700 
            text-sm flex items-center gap-1">
          <Edit strokeWidth={1} className="w-4 h-4"/> Cập nhật
        </button>
        <button onClick={()=> handleClickDelete()}
          className="cursor-pointer px-3 py-1 rounded bg-red-200 text-red-700
            text-sm flex items-center gap-1">
          <Trash strokeWidth={1} className="w-4 h-4"/> Xóa
        </button>
      </div>
    </div>
  );
}

// ---- Component chính ----
export default function CategorySortBoard() {
  const [items, setItems] = useState<Category[]>([
    {
      id: "1",
      name: "Nhà bếp",
      description: "Đồ dùng nấu nướng, lưu trữ, ăn uống",
      status: "active",
      displayOrder: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=300&q=80&auto=format&fit=crop",
      slug: "nha-bep",
    },
    {
      id: "2",
      name: "Đồ điện gia dụng",
      description: "Quạt, máy lọc, nồi chiên, máy hút bụi",
      status: "active",
      displayOrder: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1586861203927-8007f44b1d9a?w=300&q=80&auto=format&fit=crop",
      slug: "do-dien-gia-dung",
    },
    {
      id: "3",
      name: "Vệ sinh - Giặt ủi",
      description: "Chổi, cây lau, bột giặt, kệ phơi",
      status: "inactive",
      displayOrder: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80&auto=format&fit=crop",
      slug: "ve-sinh-giat-ui",
    },
    {
      id: "4",
      name: "Nội thất",
      description: "Bàn ghế, tủ kệ, trang trí",
      status: "active",
      displayOrder: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d42?w=300&q=80&auto=format&fit=crop",
      slug: "noi-that",
    },
  ]);

  const [activeItem, setActiveItem] = useState<Category | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    const key = search.trim().toLowerCase();
    if (!key) return items;
    return items.filter(
      (x) => x.name.toLowerCase().includes(key) || x.slug.toLowerCase().includes(key)
    );
  }, [items, search]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragStart(event: DragStartEvent) {
    const item = items.find((i) => i.id === event.active.id);
    if (item) setActiveItem(item);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }

    const oldIndex = items.findIndex((i) => i.id === String(active.id));
    const newIndex = items.findIndex((i) => i.id === String(over.id));
    const newArr = arrayMove(items, oldIndex, newIndex);

    const reIndexed = newArr.map((x, idx) => ({ ...x, displayOrder: idx + 1 }));
    setItems(reIndexed);
    setActiveItem(null);
  }

  return (
    <div className="">
      <SectionHeading text="Quản lý danh mục" />
      <div className="mt-5 p-4 rounded bg-white">
        <div className="flex gap-8 mt-5 items-start">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={filtered.map((x) => x.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-3 flex-1">
                {filtered.map((item) => (
                  <SortableCategoryItem key={item.id} item={item} setCategory={setCategory}/>
                ))}
              </div>
            </SortableContext>

            {/* Overlay khi kéo */}
            {typeof window !== "undefined" &&
              createPortal(
                <DragOverlay>
                  {activeItem ? <SortableCategoryItem item={activeItem} isOverlay setCategory={setCategory}/> : null}
                </DragOverlay>,
                document.body
              )}
          </DndContext>
          <AddCategoryForm category={category}/>
        </div>
      </div>
    </div>
  );
}