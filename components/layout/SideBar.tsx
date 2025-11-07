"use client";

import Link from "next/link";

const NavItems = [
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
  { href: "/customers", label: "Customers" },
  { href: "/orders", label: "Orders" },
];

export default function SideBar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 p-4">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold mb-6">Shop Dashboard</h1>
      </Link>

      <nav className="flex flex-col space-y-2">
        {NavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded hover:bg-gray-800 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
