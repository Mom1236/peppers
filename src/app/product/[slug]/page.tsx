import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
}
