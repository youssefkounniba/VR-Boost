"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, Plus, MoreHorizontal, Package } from "lucide-react";
import donnees from "@/lib/data/donnees.json";
import type { CategorieMobilier } from "@/lib/types";

export default function PageCatalogue() {
  const categories = donnees.categories as CategorieMobilier[];
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    c.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex-1 basis-64">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brume" />
          <input
            className="champ-saisie pl-11"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button type="button" className="btn-noir">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          + New
        </button>
      </div>

      {/* Grid */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* Add new category card */}
        <button
          type="button"
          className="carte flex aspect-[4/3] flex-col items-center justify-center gap-2 text-brume transition-shadow hover:shadow-panneau"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-gray-300">
            <Plus className="h-5 w-5" strokeWidth={1.8} />
          </span>
        </button>

        {filtered.map((cat) => (
          <div
            key={cat.id}
            className="carte group overflow-hidden transition-shadow hover:shadow-panneau"
          >
            <div className="relative h-36 w-full overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.nom}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="220px"
              />
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="font-bold text-encre">{cat.nom}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-ardoise">
                  <Package className="h-3 w-3" />
                  {cat.items} items
                </p>
              </div>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-brume transition-colors hover:bg-champ"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
