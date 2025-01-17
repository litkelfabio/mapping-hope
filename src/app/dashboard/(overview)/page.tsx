import { fetchHeatMap } from "@/app/lib/data";
import { QueryResultRow } from "@vercel/postgres";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "./loading";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../ui/dynamicMap"), {
  ssr: false, // This disables SSR for the DynamicMap component
});


export default async function Page(){
  console.log("here");
  const heatMapData: QueryResultRow[] = await fetchHeatMap();
  return (
    <Suspense fallback={<RevenueChartSkeleton/>}>
      <DynamicMap mapData={heatMapData} mapType="heatmap" />
    </Suspense>
  );
};
