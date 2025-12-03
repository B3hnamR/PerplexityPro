import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "admin@example.com";
    const password = "admin"; // Change this in production!
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password: hashedPassword,
            name: "Super Admin",
        },
    });

    const product = await prisma.product.upsert({
        where: { id: "default-product" },
        update: {},
        create: {
            id: "default-product",
            name: "Lumina Wireless",
            description: "High-fidelity wireless headphones with active noise cancellation.",
            price: 299000,
            imageUrl: "/product-placeholder.jpg",
        },
    });

    console.log({ admin, product });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
