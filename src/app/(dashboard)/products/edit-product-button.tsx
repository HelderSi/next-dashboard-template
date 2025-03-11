"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductForm from "./product-form";
import { Modal } from "@/components/modal";

export default function EditProductButton({ product }: { readonly product: { id: string; name: string; price: number } }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="ghost" onClick={() => setOpen(true)}>
                <Pencil className="h-4 w-4" /> Edit
            </Button>

            <Modal open={open} onClose={() => setOpen(false)} title="Edit Product">
                <ProductForm product={product} onClose={() => setOpen(false)} />
            </Modal>
        </>
    );
}
