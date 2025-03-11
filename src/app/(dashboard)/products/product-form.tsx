"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProduct, editProduct } from "../actions";
import toast from "react-hot-toast";
import { resolve } from "path";

export default function ProductForm({
    product,
    onClose,
}: {
    readonly product?: { id: string; name: string; price: number };
    readonly onClose: () => void;
}) {
    const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
        const result = await (product ? editProduct : addProduct)(formData);

        if (result.success) {
            toast.success(`${product ? "Updated" : "Added"} product successfully!`);
            onClose();
        } else {
            toast.error(result.error || "Something went wrong.");
        }
        return result;
    }, { error: "" });


    return (
        <form action={formAction} className="space-x-4">
            <input type="hidden" name="id" value={product?.id ?? ""} />
            <div>
                <Label htmlFor="name" >Product Name</Label>
                <Input id="name" name="name" defaultValue={product?.name ?? ""} required className="mb-2 mt-2" />
            </div>
            <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={product?.price ?? ""}
                    required
                    className="mb-2 mt-2"
                />
            </div>
            <div className="flex gap-2 mt-4">
                <Button type="submit" disabled={isPending}>{product ? "Update" : "Save"}</Button>
                <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
