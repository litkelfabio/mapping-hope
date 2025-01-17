import { fetchClusterMap } from "@/app/lib/data";
import { QueryResultRow } from "@vercel/postgres";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "../(overview)/loading";

const DynamicMap = dynamic(() => import("../../ui/dynamicMap"), {
  ssr: false, // This disables SSR for the DynamicMap component
});

export default async function Page(){
  console.log("here");
  const clusterMapData: QueryResultRow[] = await fetchClusterMap();
  return (
    <Suspense fallback={<RevenueChartSkeleton/>}>
      <DynamicMap mapData={clusterMapData} mapType="clusterMap" />
    </Suspense>
  );
};
