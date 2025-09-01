import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

const page = () => {
  return (
    <div>
      {/* Tiêu đề */}
      <SectionTitle title="Liên hệ" />

      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10 mt-8 px-32">
        {/* Thông tin liên hệ */}
        <div className="space-y-6">
          <h2 className="text-3xl">Thông tin liên hệ</h2>
          <p className="text-gray-600">
            Nếu bạn có câu hỏi, vui lòng liên hệ với chúng tôi qua thông tin dưới đây hoặc gửi tin nhắn qua form.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <span>123 Đường ABC, Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6" />
              <span>+84 912 345 678</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              <span>support@website.com</span>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.509581543742!2d106.700423!3d10.776889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f45a1226a7b%3A0xa1f6a8d2ecf6a6a6!2zQ2hvbmcgVmnhu4du!5e0!3m2!1svi!2s!4v1690000000000!5m2!1svi!2s"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Họ và tên</label>
              <input
                type="text"
                placeholder="Nhập họ tên"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Nhập email"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nội dung</label>
              <textarea
                rows={4}
                placeholder="Nhập nội dung"
                className="w-full border rounded-lg px-3 py-2"
              ></textarea>
            </div>
            <Button text="Gửi ngay" isSubmit={true}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;