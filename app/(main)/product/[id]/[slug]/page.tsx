import SectionTitle from '@/components/SectionTitle'
import { Facebook, MessageCircle, Minus, Plus, Star, Twitter } from 'lucide-react';
import ProductImages from './ProductImages ';
import ProductDescription from './ProductDescription';
import ListProduct from '@/components/ListProduct';
import ScoreStar from '@/components/ScoreStar';
import AddToCart from './AddToCart';

const listImage = [
  { id: 1, imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/pro-5-600x600.png' },
  { id: 2, imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/dracing-table.png' },
  { id: 3, imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/chair-wood-600x600.png' },
  { id: 4, imageUrl: 'https://smartfurniture.monamedia.net/wp-content/uploads/2022/09/ch1.png' }
]

const Page = async ({ params }: { params: { id: string; slug: string } }) => {
  const { id, slug } = await params;

  return (
    <div>
      <SectionTitle title="Chi tiết sản phẩm" subTitle={`${slug} - ${id}`} />
      <div className="px-32 flex gap-10 my-14">
        {/* Cột ảnh */}
        <ProductImages images={listImage} />

        {/* Cột nội dung */}
        <div className="w-1/2 flex flex-col gap-5">
          <h5 className="text-2xl">Amelia Table Lamp With Box</h5>
          <div className="flex items-center gap-3">
            <ScoreStar score={4.5} />
            <p className="text-sm">(1 đánh giá của khách hàng)</p>
          </div>
          <p>
            <span className="line-through text-gray-500">650,000₫</span>{" "}
            <span className="underline">550,000₫</span>
          </p>
          <p className="text-gray-600">
            Rorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
          <p>Danh mục: Bookshelv & Bookc, Court Cupboard</p>
          <div className="flex items-center gap-4">
            <span>Chia sẻ:</span>
            <Facebook />
            <Twitter />
            <MessageCircle />
          </div>
          <AddToCart />
        </div>
      </div>
      <ProductDescription />
      <ListProduct title='Sản phẩm tương tự' count={4} />
    </div>
  );
};

export default Page;
