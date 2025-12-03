"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmartSearchDemo from "@/components/SmartSearchDemo";
import StorySection from "@/components/StorySection"; // Features section
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
        <main className="bg-[#0f172a] min-h-screen text-white overflow-x-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            <Navbar onPreOrder={handlePreOrder} />
            
            <div className="space-y-0">
                <Hero onPreOrder={handlePreOrder} />
                
                {/* Add some spacing or dividers if needed between sections */}
                <div className="relative z-20">
                    <SmartSearchDemo />
                </div>
                
                <StorySection />
                
                <PricingSection product={product} />
                
                <FAQSection />
                
                <TestimonialsSection />
            </div>
            
            <Footer />
            <ScrollToTop />
        </main>
    );
}