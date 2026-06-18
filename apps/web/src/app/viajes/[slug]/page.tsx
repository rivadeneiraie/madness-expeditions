import { notFound } from "next/navigation";
import { getTripBySlug, getAllTrips } from "@/lib/trips/api";
import FichaViaje from "@/components/views/FichaViaje";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const trips = await getAllTrips();
    return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const trip = await getTripBySlug(slug);
    if (!trip) return { title: "Viaje no encontrado" };

    return {
        title: `${trip.name} — Madness Expeditions`,
        description: trip.description[0],
    };
}

export default async function FichaViajePage({ params }: Props) {
    const { slug } = await params;
    const trip = await getTripBySlug(slug);

    if (!trip) notFound();

    return (
        <>
            <Navbar />
            <main>
                <FichaViaje trip={trip} />
            </main>
            <Footer />
        </>
    );
}
