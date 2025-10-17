import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import Select from "../ui/Select";

interface FilterProps {
  currentShow: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode; // nếu bạn muốn truyền thêm phần mở rộng
}

const Filter: React.FC<FilterProps> = ({
  currentShow,
  search,
  setSearch,
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setShowingCount = (show: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("show", show.toString());
    router.push(`?${params.toString()}`);
  };
  const data = [
    { id: 5, name: 5 },
    { id: 10, name: 10 },
    { id: 15, name: 15 },
  ];
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="flex gap-2 items-center">
        Hiển thị
        <Select
          data={data}
          value={currentShow}
          valueField="id"
          labelField="name"
          onChange={(val) => setShowingCount(Number(val))}
          className="bg-gray-200 rounded outline-none py-1 px-3 min-w-[80px]"
        />
      </div>
      <div className="flex-1 flex items-center gap-5 justify-end">
        {children}
      </div>

      <div className="flex items-center gap-2 bg-gray-100 rounded px-4 py-2">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="outline-none bg-transparent placeholder:text-sm"
          placeholder="Tìm kiếm"
        />
        <Search size={20} strokeWidth={1} />
      </div>
    </div>
  );
};

export default Filter;
