import { fetchHeatMap } from "@/app/lib/data";
import { QueryResultRow } from "@vercel/postgres";
import { SideNav } from "./ui/dashboard/sidenav";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "./dashboard/(overview)/loading";

const DynamicMap = dynamic(() => import("../app/ui/dynamicMap"), {
  ssr: false, // This disables SSR for the DynamicMap component
});

export default async function Page() {
  console.log("here");
  const heatMapData: QueryResultRow[] = await fetchHeatMap();
  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-200">
      <SideNav />
      <div>
        <Suspense fallback={<RevenueChartSkeleton/>}>
        <DynamicMap mapData={heatMapData} mapType="heatmap" />
        </Suspense>
      </div>
    </div>
  );
}
