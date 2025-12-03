"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import StorySection from "@/components/StorySection";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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
            id: "perplexity-pro-1year",
            name: product?.name || "Perplexity Pro Subscription",
            price: product?.price || 299000
        });
        router.push("/cart");
    };

    return (
        <main>
            <Navbar onPreOrder={handlePreOrder} />
            <Hero onPreOrder={handlePreOrder} />
            <StorySection />
            <TrustSection />
            <PricingSection product={product} />
            <TestimonialsSection />
            <Footer />
            <ScrollToTop />
        </main>
    );
}
