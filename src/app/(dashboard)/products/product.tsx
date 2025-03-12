import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteProduct } from "../actions";
import { ProductModel } from "@/models/Product";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal } from "@/components/modal";
import ProductForm from "./product-form";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/icons";

export function Product({ product, selected, onSelectedChange }: {
    readonly product: ProductModel;
    readonly selected: boolean;
    readonly onSelectedChange: () => void;
}) {
    const [editing, setEditing] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const toastId = toast.loading("Deleting product...");
            try {
                await deleteProduct(product.id);
                toast.success("Product deleted successfully!", { id: toastId });
            } catch (error) {
                toast.error("Failed to delete product.", { id: toastId });
            } finally {
                setConfirmingDelete(false);
            }
        });
    };

    return (
        <>
            <TableRow>
                <TableCell className="hidden sm:table-cell">
                    <Checkbox checked={selected} onCheckedChange={onSelectedChange} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                    <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.imageUrl}
                        width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                    <Badge variant="outline" className="capitalize">
                        {product.status}
                    </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
                <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                <TableCell className="hidden md:table-cell">
                    {product.availableAt.toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setEditing(true)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setConfirmingDelete(true)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>

            {/* Edit Product Modal */}
            <Modal open={editing} onClose={() => setEditing(false)} title="Edit Product">
                <ProductForm product={product} onClose={() => setEditing(false)} />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal open={confirmingDelete} onClose={() => setConfirmingDelete(false)} title="Confirm Delete">
                <p>Are you sure you want to delete <strong>{product.name}</strong>?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setConfirmingDelete(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                        {isPending ? <Spinner className="mr-2" /> : null}
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    );
}
