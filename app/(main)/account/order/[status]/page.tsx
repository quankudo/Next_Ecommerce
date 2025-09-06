// app/(main)/account/orders/[status]/page.tsx  (Server Component)
import { Metadata } from "next";
import OrderStatusClient from "./OrderStatusClient";

interface Props {
  params: { status: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const {status} = await params;
    
  return {
    title: `Đơn hàng - ${status}`,
    robots: { index: false }, // private page
  };
}

export default async function OrderStatusPage({ params }: Props) {
  // destructuring từ params
  const { status } = await params;

  return <OrderStatusClient status={status} />;
}
