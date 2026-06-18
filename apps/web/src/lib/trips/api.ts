import { type Trip, type TripDate } from "./types";
import { client } from "@/sanity/client";
import { ALL_TRIPS_QUERY, TRIP_BY_SLUG_QUERY } from "@/sanity/queries";

function normalizeSpots(spots: string | number | undefined): number | "completo" {
    if (spots === "completo") return "completo";
    if (typeof spots === "number") return spots;
    const parsed = parseInt(String(spots), 10);
    return isNaN(parsed) ? 0 : parsed;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeTrip(raw: any): Trip {
    return {
        ...raw,
        dates: (raw.dates ?? []).map((d: { date: string; spots: string | number }) => ({
            date: d.date,
            spots: normalizeSpots(d.spots),
        })),
    } as Trip;
}

export async function getAllTrips(): Promise<Trip[]> {
    const raw = await client.fetch(ALL_TRIPS_QUERY, {}, { next: { revalidate: 3600 } });
    return (raw ?? []).map(normalizeTrip);
}

export async function getTripBySlug(slug: string): Promise<Trip | undefined> {
    const raw = await client.fetch(TRIP_BY_SLUG_QUERY, { slug }, { next: { revalidate: 3600 } });
    if (!raw) return undefined;
    return normalizeTrip(raw);
}

export type { Trip, TripDate };
