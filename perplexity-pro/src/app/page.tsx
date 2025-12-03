import HomeClient from "@/components/HomeClient";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  let product = null;
  try {
    product = await prisma.product.findUnique({
      where: { id: "default-product" },
    });
  } catch (error) {
    console.error("Failed to load product for home page:", error);
    product = null;
  }

  return <HomeClient product={product} />;
}
