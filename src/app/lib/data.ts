import { sql, db } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchHeatMap() {
  const client = await db.connect();
  noStore();
  try {
    const count = await client.sql`SELECT brgy_id, COUNT(*) AS total_residents
      FROM residents GROUP BY brgy_id
    `;

    return count.rows;
  } catch (error) {
    console.error("Database Error:", error, process.env);
    throw new Error("Failed to fetch heat map data.");
  }
}

export async function fetchClusterMap() {
  const client = await db.connect();
  noStore();
  try {
    const count = await client.sql`SELECT *
    FROM residents
  `;

    return count.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cluster map data.');
  }
}