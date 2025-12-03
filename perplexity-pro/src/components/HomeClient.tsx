"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmartSearchDemo from "@/components/SmartSearchDemo";
import StorySection from "@/components/StorySection"; // همان بخش Features جدید
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

interface HomeClientProps {
    product: any;
}

export default function HomeClient({ product }: HomeClientProps) {
    const { addItem } = useCart();
    const router = useRouter();

    const handlePreOrder = () => {
        addItem({
            id: product?.id || "perplexity-pro-1year",
            name: product?.name || "Perplexity Pro Subscription",
            price: product?.price || 398000
        });
        router.push("/cart");
    };

    return (
        <main className="bg-[#0f172a] min-h-screen text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
            <Navbar onPreOrder={handlePreOrder} />
            <Hero onPreOrder={handlePreOrder} />
            <SmartSearchDemo />
            <StorySection />
            <PricingSection product={product} />
            <FAQSection />
            <TestimonialsSection />
            <Footer />
            <ScrollToTop />
        </main>
    );
}