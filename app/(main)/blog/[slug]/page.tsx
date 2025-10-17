import SectionTitle from "@/components/SectionTitle";
import React from "react";
import BlogAside from "../BlogAside";
import BlogItem from "../BlogItem";
import Button from "@/components/ui/Button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import RecommendBlogs from "./RecommendBlogs";
import ListComment from "./ListComment";

const Page = async ({ params }: { params: { id: string; slug: string } }) => {
  const { slug } = await params;
  return (
    <div>
      <SectionTitle title="Name Blog" subTitle={slug} />
      <div className="px-32 flex gap-10 my-14">
        <div className="w-3/4 flex flex-col">
          <BlogItem />
          <div className="w-full">
            <h2 className="mt-5">
              1. Giới thiệu về xu hướng nội thất hiện đại 2025
            </h2>
            <p>
              <strong>Ngành nội thất</strong> đang chứng kiến sự thay đổi mạnh
              mẽ nhờ vào <em>công nghệ và xu hướng thiết kế mới</em>. Người tiêu
              dùng ngày càng ưu tiên những sản phẩm thân thiện với môi trường,
              tối giản nhưng vẫn sang trọng.
            </p>

            <blockquote>
              “Không gian sống đẹp không chỉ là nơi để ở, mà còn là nơi thể hiện
              cá tính và phong cách sống của bạn.”
            </blockquote>

            <p>
              Trong năm 2025, các nhà thiết kế nội thất hướng đến việc tạo nên{" "}
              <mark>“không gian thông minh – không gian cảm xúc”</mark>, nơi mà
              từng món đồ đều có mục đích và giá trị thẩm mỹ riêng.
            </p>

            <h2>2. Top 5 phong cách nội thất được yêu thích nhất</h2>
            <ul>
              <li>
                <strong>Scandinavian:</strong> Đơn giản, tinh tế và tràn ngập
                ánh sáng tự nhiên.
              </li>
              <li>
                <strong>Modern Minimalism:</strong> Tối giản, ít chi tiết nhưng
                đầy tính thẩm mỹ.
              </li>
              <li>
                <strong>Japandi:</strong> Kết hợp hoàn hảo giữa Nhật Bản và Bắc
                Âu.
              </li>
              <li>
                <strong>Industrial:</strong> Hơi hướng công nghiệp, sử dụng kim
                loại và gỗ mộc.
              </li>
              <li>
                <strong>Bohemian:</strong> Tự do, phóng khoáng với màu sắc đa
                dạng.
              </li>
            </ul>

            <img
              src="https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-9.jpg"
              alt="Các phong cách nội thất nổi bật năm 2025"
            />

            <h2>3. Những lưu ý khi chọn nội thất cho ngôi nhà của bạn</h2>
            <ol>
              <li>
                <strong>Xác định phong cách:</strong> Mỗi phong cách sẽ có tông
                màu và chất liệu riêng, nên cần xác định rõ trước khi mua sắm.
              </li>
              <li>
                <strong>Chọn kích thước phù hợp:</strong> Không gian nhỏ nên ưu
                tiên nội thất đa năng, có thể gấp gọn hoặc di chuyển dễ dàng.
              </li>
              <li>
                <strong>Chú ý ánh sáng:</strong> Ánh sáng tự nhiên giúp làm nổi
                bật các chi tiết gỗ, đá hoặc kim loại.
              </li>
              <li>
                <strong>Chất liệu bền vững:</strong> Ưu tiên gỗ tự nhiên, tre,
                nứa hoặc các vật liệu tái chế để bảo vệ môi trường.
              </li>
              <li>
                <strong>Tạo điểm nhấn:</strong> Một chiếc ghế sofa màu nổi, hay
                chiếc đèn trần phá cách sẽ làm không gian trở nên khác biệt.
              </li>
            </ol>

            <h2>
              4. Ưu điểm của việc mua nội thất online tại{" "}
              <a href="https://furniture-store.vn" target="_blank">
                Furniture Store
              </a>
            </h2>
            <p>
              Ngày nay, việc mua sắm nội thất <em>trực tuyến</em> trở nên phổ
              biến hơn bao giờ hết. Tại <strong>Furniture Store</strong>, khách
              hàng có thể:
            </p>
            <ul>
              <li>Xem trước các mẫu sản phẩm qua hình ảnh 3D sắc nét.</li>
              <li>
                So sánh giá, chất liệu và kiểu dáng chỉ với vài cú nhấp chuột.
              </li>
              <li>Được tư vấn thiết kế miễn phí bởi đội ngũ chuyên nghiệp.</li>
              <li>
                Nhận ưu đãi giảm giá lên đến <mark>30%</mark> cho đơn hàng đầu
                tiên.
              </li>
            </ul>

            <h2>5. Kết luận</h2>
            <p>
              Chọn lựa nội thất không chỉ là việc trang trí, mà còn là{" "}
              <strong>tạo dựng phong cách sống riêng biệt</strong>. Dù bạn theo
              đuổi phong cách hiện đại hay cổ điển, điều quan trọng nhất là{" "}
              <em>sự cân bằng giữa công năng và thẩm mỹ</em>.
            </p>
            <p>
              Hãy để <a href="https://furniture-store.vn">Furniture Store</a>{" "}
              giúp bạn biến ngôi nhà thành nơi đáng sống – nơi mọi chi tiết đều
              kể một câu chuyện.
            </p>

            <img
              src="https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/news-12.jpg"
              alt="Không gian phòng khách hiện đại"
            />
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4 items-center">
              <h4 className="text-xl">Từ khóa:</h4>
              <button className="px-6 py-3 border border-gray-200 hover:bg-black hover:text-white">
                PLASTIC
              </button>
              <button className="px-6 py-3 border border-gray-200 hover:bg-black hover:text-white">
                WOOD
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <h4 className="text-xl">Chia sẻ:</h4>
              <button className="p-2 rounded hover:bg-black hover:text-white bg-gray-200">
                <Facebook />
              </button>
              <button className="p-2 rounded hover:bg-black hover:text-white bg-gray-200">
                <Twitter />
              </button>
              <button className="p-2 rounded hover:bg-black hover:text-white bg-gray-200">
                <Instagram />
              </button>
            </div>
          </div>
          <RecommendBlogs />
          <ListComment />
        </div>
        <div className="w-1/4 sticky top-24 h-fit">
          <BlogAside />
        </div>
      </div>
    </div>
  );
};

export default Page;
