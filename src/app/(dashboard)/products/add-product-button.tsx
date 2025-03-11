"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductForm from "./product-form";
import { Modal } from "@/components/modal";

export default function AddProductButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button size="sm" className="h-8 gap-1" onClick={() => setOpen(true)}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                </span>
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} title="Add Product">
                <ProductForm onClose={() => setOpen(false)} />
            </Modal>
        </>
    );
}
