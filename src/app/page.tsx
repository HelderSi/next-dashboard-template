"use client";

import { useState } from "react";
import { Home, Users, Settings, ChevronsUpDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/sidebar";

interface User {
  id: number;
  name: string;
  role: string;
}

const navItems = [
  { name: "Home", icon: Home },
  { name: "Users", icon: Users },
  { name: "Settings", icon: Settings },
];

const initialUsers: User[] = [
  { id: 1, name: "Alice Johnson", role: "Coordinator" },
  { id: 2, name: "Bob Smith", role: "Helper" },
  { id: 3, name: "Charlie Brown", role: "Organizer" },
];

const allColumns = ["name", "role"];

export default function Dashboard() {
  const [active, setActive] = useState<string>("Home");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(allColumns);
  const rowsPerPage = 5;

  const { logoutUser } = useAuthStore();

  const handleSignOut = async () => {
    await logoutUser();
  };


  const toggleSelect = (id: number) => {
    const newSelected = new Set(selected);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelected(newSelected);
  };

  const toggleSelectAll = () => {
    setSelected(selected.size === users.length ? new Set() : new Set(users.map(v => v.id)));
  };

  const handleSort = (column: keyof User) => {
    const newDirection: "asc" | "desc" = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    setUsers([...users].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1;
      return 0;
    }));
  };

  const filteredUsers = users.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.role.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        navItems={navItems}
        handleSignOut={handleSignOut}
        onActiveChange={(name) => setActive(name)}
      />

      <main className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold">{active}</h2>
          {active === "Users" ? (
            <div>
              <div className="flex justify-between mb-4">
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-1/3"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select Columns</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {allColumns.map((col) => (
                      <DropdownMenuItem key={col} onClick={() => {
                        setVisibleColumns(prev => prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]);
                      }}>
                        <Checkbox checked={visibleColumns.includes(col)} /> {col}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-gray-600 mb-2">Total Rows: {filteredUsers.length}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox
                        checked={selected.size === users.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    {visibleColumns.includes("name") && (
                      <TableHead onClick={() => handleSort("name")} className="cursor-pointer">Name <ChevronsUpDown className="w-4 h-4 inline" /></TableHead>
                    )}
                    {visibleColumns.includes("role") && (
                      <TableHead onClick={() => handleSort("role")} className="cursor-pointer">Role <ChevronsUpDown className="w-4 h-4 inline" /></TableHead>
                    )}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selected.has(user.id)}
                          onCheckedChange={() => toggleSelect(user.id)}
                        />
                      </TableCell>
                      {visibleColumns.includes("name") && <TableCell>{user.name}</TableCell>}
                      {visibleColumns.includes("role") && <TableCell>{user.role}</TableCell>}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost"><MoreVertical className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-600 mt-2">Welcome to the {active} page.</p>
          )}
        </div>
      </main>
    </div>
  );
}
