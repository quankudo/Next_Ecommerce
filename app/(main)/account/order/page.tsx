import { redirect } from "next/navigation";

export default function OrderPage() {
  redirect("account/order/pending");
}