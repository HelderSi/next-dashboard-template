"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProduct, editProduct } from "../actions";
import toast from "react-hot-toast";
import { Spinner } from "@/components/icons";

export default function ProductForm({
    product,
    onClose,
}: {
    readonly product?: { id: string; name: string; price: number };
    readonly onClose: () => void;
}) {

    const [state, formAction, isPending] = useActionState(async (_prevState: any, formData: FormData) => {
        // Show loading toast
        const toastId = toast.loading(`${product ? "Updating" : "Adding"} product...`);

        const actionFn = product ? editProduct : addProduct;
        const result = await actionFn(formData);

        if (result.success) {
            toast.success(`${product ? "Product updated" : "Product added"} successfully!`, { id: toastId });
            onClose();
        } else {
            toast.error(result.error || "Something went wrong.", { id: toastId });
        }

        return result;
    }, { error: "" });

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={product?.id ?? ""} />
            <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                    id="name"
                    name="name"
                    defaultValue={product?.name ?? ""}
                    required
                    className="mt-1"
                    disabled={isPending}
                />
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
                    className="mt-1"
                    disabled={isPending}
                />
            </div>

            <div className="flex gap-2 mt-4">
                <Button type="submit" disabled={isPending}>
                    {isPending ? <Spinner className="mr-2" /> : null}
                    {product ? "Update" : "Save"}
                </Button>
                <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
