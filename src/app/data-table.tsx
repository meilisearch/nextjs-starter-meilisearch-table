"use client"

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { meilisearchClient } from "@/lib/meilisearch"
import { useEffect, useState } from "react";
import { Organization, columns } from "./columns"

function truncate(text: string, length: number) {
  if (text.length <= length) {
    return text;
  }

  return text.substr(0, length) + "\u2026";
}

export function DataTable() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<Organization> | any>();

  const index = meilisearchClient.getIndex("organizations");

  const table = useReactTable({
    data: searchResults || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  async function search(query = "") {
    return await index
      .search(truncate(query, 50))
      .then((res) => {
        console.log("res:", res);
        return res.hits;
      })
      .catch((err) => {
        console.error("err:", err);
        return [];
      });
  };

  useEffect(() => {
    (async () => setSearchResults(await search()))();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Input
          placeholder="Search companies..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            search(event.target.value).then((results) => {
              setSearchResults(results);
            })
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
