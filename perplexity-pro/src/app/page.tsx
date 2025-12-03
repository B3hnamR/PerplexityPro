import HomeClient from "@/components/HomeClient";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  let product = null;
  try {
    // دریافت اولین محصول از دیتابیس برای نمایش قیمت و اطلاعات
    product = await prisma.product.findFirst();
  } catch (error) {
    console.error("Failed to load product for home page:", error);
    product = null;
  }

  // ارسال اطلاعات محصول به کامپوننت کلاینت (HomeClient) که کل طراحی صفحه اصلی را دارد
  return <HomeClient product={product} />;
}