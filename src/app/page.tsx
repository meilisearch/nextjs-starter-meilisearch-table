import { DataTable } from "./data-table"
// import { meilisearchClient } from "@/lib/meilisearch"

export default async function DemoPage() {
  // const index = meilisearchClient.getIndex("organizations");

  // const result = await index.search("a");
  // console.log(result);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Companies</h2>
          <p className="text-muted-foreground">
            Let search into the companies!
          </p>
        </div>
      </div>
      <DataTable />
    </div>
  )
}
