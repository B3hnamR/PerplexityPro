"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import StorySection from "@/components/StorySection"; // Now Features
import SmartSearchDemo from "@/components/SmartSearchDemo"; // New
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PricingSection from "@/components/PricingSection";

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
        <main>
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