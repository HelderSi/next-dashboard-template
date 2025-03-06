'use client';

import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    Table
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from './product';
import { ProductModel } from '@/models/Product';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { SearchInput } from '../search';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function ProductsTable({
    products,
    offset,
    totalProducts,
    showTitleDescription = false
}: {
    readonly products: ProductModel[];
    readonly offset: number;
    readonly totalProducts: number;
    readonly showTitleDescription?: boolean;
}) {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    let router = useRouter();
    let productsPerPage = 5;

    function prevPage() {
        router.back();
    }

    function nextPage() {
        router.push(`/?offset=${offset}`, { scroll: false });
    }

    const toggleSelectAll = () => {
        setSelected(selected.size === products.length ? new Set() : new Set(products.map(v => v.id)));
    };

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selected);
        newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
        setSelected(newSelected);
    };

    const handleSort = (column: keyof ProductModel) => {
        // Sorting logic placeholder
    };

    const handleBulkAction = (action: string) => {
        console.log(`Performing ${action} on:`, Array.from(selected));
        // Implement batch processing logic (e.g., delete, update, export)
    };

    return (
        <Card>
            <CardHeader className="flex justify-between">
                {showTitleDescription && (
                    <div>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            Manage your products and view their sales performance.
                        </CardDescription>
                    </div>
                )}
                <div className="flex gap-2">
                    <SearchInput path='products' position='mr-auto' />
                    {!!selected.size &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button disabled={selected.size === 0}>
                                    Bulk Actions ({selected.size})
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => handleBulkAction('delete')}>Delete</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleBulkAction('mark_active')}>Mark as Active</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>}
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer hidden md:table-cell">
                                <Checkbox
                                    checked={selected.size === products.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                                Name <ChevronsUpDown className="w-4 h-4 inline" />
                            </TableHead>
                            <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                                Status <ChevronsUpDown className="w-4 h-4 inline" />
                            </TableHead>
                            <TableHead onClick={() => handleSort("price")} className="cursor-pointer hidden md:table-cell">
                                Price <ChevronsUpDown className="w-4 h-4 inline" />
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Total Sales</TableHead>
                            <TableHead onClick={() => handleSort("availableAt")} className="cursor-pointer hidden md:table-cell">
                                Created at <ChevronsUpDown className="w-4 h-4 inline" />
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <Product key={product.id} product={product} selected={selected.has(product.id)} onSelectedChange={() => toggleSelect(product.id)} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing{' '}
                        <strong>
                            {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
                        </strong>{' '}
                        of <strong>{totalProducts}</strong> products
                    </div>
                    <div className="flex">
                        <Button
                            formAction={prevPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset === productsPerPage}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Prev
                        </Button>
                        <Button
                            formAction={nextPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset + productsPerPage > totalProducts}
                        >
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardFooter>
        </Card>
    );
}
