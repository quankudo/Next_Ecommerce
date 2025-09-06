import { Search } from 'lucide-react';
import { useSearchParams, useRouter } from "next/navigation";
import React from 'react'

const Filter = ({currentShow, search, setSearch}: {currentShow: number, search: string, setSearch: React.Dispatch<React.SetStateAction<string>>}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setShowingCount = (show: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("show", show.toString());
        router.push(`?${params.toString()}`);
    };
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
            Hiển thị
            <select
                value={currentShow}
                onChange={(e) => {
                setShowingCount(Number(e.target.value));
                }}
                className="bg-gray-200 rounded outline-none py-1 px-3"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded px-4 py-3">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                setSearch(e.target.value);
                router.push(`?page=1`); // reset về trang 1
                }}
                className="outline-none bg-transparent"
                placeholder="Tìm kiếm"
            />
            <Search size={20} strokeWidth={1} />
            </div>
        </div>
    )
}

export default Filter
