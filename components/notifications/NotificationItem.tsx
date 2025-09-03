import React from 'react'
import { Bell, Package, Info, CheckCircle } from "lucide-react";
import { Notification } from '@/types/notification';

const NotificationItem = ({item}: {item: Notification}) => {
    const getIcon = (type: Notification["type"]) => {
        switch (type) {
        case "order":
            return <Package className="w-5 h-5 text-blue-500" />;
        case "system":
            return <Info className="w-5 h-5 text-red-500" />;
        case "promotion":
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        default:
            return <Bell className="w-5 h-5 text-gray-400" />;
        }
    };
    return (
        <div
            className={`flex gap-3 items-start p-3 border-b border-gray-300 last:border-none cursor-pointer transition hover:bg-gray-50 ${
            !item.isRead ? "bg-gray-100" : ""
            }`}
        >
            <div className="shrink-0">{getIcon(item.type)}</div>
            <div className="flex-1">
                <p
                    className={`text-sm ${
                    item.isRead ? "text-gray-600" : "text-black font-medium"
                    }`}
                >
                    {item.content}
                </p>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span className="capitalize">{item.type}</span>
                    <span>{item.date}</span>
                </div>
            </div>
            {!item.isRead && (
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1"></span>
            )}
        </div>      
    )
}

export default NotificationItem
