import { BARS } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <section
      id="bars"
      data-bg="bg"
      aria-label="All bars"
      className="md:hidden py-20"
    >
      <div className="shell grid gap-6">
        {BARS.map((bar, i) => (
          <ProductCard key={bar.slug} bar={bar} eager={i === 0} />
        ))}
      </div>
    </section>
  );
}
