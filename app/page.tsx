import { Hero } from "@/components/hero"
import { RecommendedSection } from "@/components/recommended-section"
import { CategoriesSection } from "@/components/categories-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecommendedSection />
      <CategoriesSection />
    </>
  )
}
