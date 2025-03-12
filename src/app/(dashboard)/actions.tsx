'use server';

import { createProduct, deleteProductById, updateProduct } from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function deleteProduct(id: string) {
    if (!id)
        return;

    await deleteProductById(id);
    revalidatePath('/');
    return;
}

export async function addProduct(formData: FormData) {
    const name = formData.get("name")?.toString().trim();
    const price = formData.get("price")?.toString().trim();

    if (!name || !price) {
        return { error: "Name and price are required." };
    }

    try {
        await createProduct({ name, price: parseFloat(price) });
        // Revalidate the products page to reflect changes
        revalidatePath("/products");
        return { success: "Product added successfully!" };
    } catch (error) {
        return { error: "Failed to add product." };
    }
}


export async function editProduct(formData: FormData) {
    const id = formData.get('id')?.toString()
    if (!id) {
        return { error: "ID is required." };
    }
    const name = formData.get("name")?.toString().trim();
    const price = formData.get("price")?.toString().trim();

    if (!name || !price) {
        return { error: "Name and price are required." };
    }
    try {
        await updateProduct({
            id,
            data: {
                name,
                price: parseFloat(price),
            },
        });

        // Revalidate the products page to reflect changes
        revalidatePath("/products");

        return { success: "Product updated successfully!" };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, error: "Failed to update product." };
    }
}
