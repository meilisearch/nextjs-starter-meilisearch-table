"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Organization = {
  uuid: string
  name: string
  short_description: string
  homepage_url: string
  country_code: string
  roles: "company" | "school" | "investor"
}

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "uuid",
    header: "UUID",
    cell: ({ row }) => {
      const uuid: string = row.getValue("uuid")

      return <p className="line-clamp-1 font-semibold">{uuid}</p>
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "country_code",
    header: "Country",
    cell: ({ row }) => {
      const country: string = row.getValue("country_code")
      if (country) {
        return <Badge variant="outline">{country}</Badge>
      }
    }
  },
  {
    accessorKey: "roles",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("roles")

      return <Badge variant="outline">{type}</Badge>
    }
  },
  {
    accessorKey: "short_description",
    header: "Description",
    cell: ({ row }) => {
      const description: string = row.getValue("short_description")

      return <p className="line-clamp-1">{description}</p>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const organization = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Visit Website</DropdownMenuItem>
            <DropdownMenuItem>Visit Crunchbase</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
