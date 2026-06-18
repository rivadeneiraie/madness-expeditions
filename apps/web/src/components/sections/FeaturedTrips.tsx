import Link from "next/link";
import TripCard, { type TripCardProps } from "../ui/TripCard";
import { getAllTrips } from "@/lib/trips/api";

export default async function FeaturedTrips() {
    const allTrips = await getAllTrips();
    const FEATURED_TRIPS: TripCardProps[] = allTrips.slice(0, 3).map((trip) => {
        const firstAvailable = trip.dates?.find((d) => d.spots !== "completo");
        return {
            name: trip.name,
            location: trip.location,
            altitude: trip.altitude,
            duration: `${trip.days} días`,
            note: trip.cardNote ?? firstAvailable?.date ?? "Próximamente",
            level: trip.level,
            difficulty: trip.difficulty,
            imageSrc: trip.imageSrc,
            href: `/viajes/${trip.slug}`,
        };
    });
    return (
        <section
            id="viajes"
            style={{ background: "#1C1C1E", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
            <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10 lg:py-16">

                {/* Header — mobile: stack · desktop: flex espacio entre */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 lg:mb-10 gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#E63030" }}>
                            Expediciones
                        </p>
                        <h2 className="text-2xl lg:text-4xl font-black leading-tight text-white">
                            Algunos de nuestros viajes
                        </h2>
                    </div>

                    {/* CTAs header — solo desktop */}
                    <div className="hidden lg:flex gap-3">
                        <Link
                            href="/viajes"
                            className="text-sm font-bold text-white px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
                            style={{ background: "#E63030" }}
                        >
                            Ver todos los viajes
                        </Link>
                        <Link
                            href="/proximas-salidas"
                            className="text-sm font-medium px-6 py-3 rounded-xl border transition-colors hover:text-white"
                            style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.1)" }}
                        >
                            Ver próximas fechas →
                        </Link>
                    </div>
                </div>

                {/* Cards — mobile: 2 cards columna · desktop: 3 cols grid */}
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
                    {/* Mobile: solo primeras 2 · Desktop: las 3 */}
                    {FEATURED_TRIPS.slice(0, 2).map((trip) => (
                        <div key={trip.name} className="lg:hidden">
                            <TripCard {...trip} />
                        </div>
                    ))}
                    {FEATURED_TRIPS.map((trip) => (
                        <div key={`d-${trip.name}`} className="hidden lg:block">
                            <TripCard {...trip} />
                        </div>
                    ))}
                </div>

                {/* CTAs footer — solo mobile */}
                <div className="lg:hidden mt-6">
                    <Link
                        href="/viajes"
                        className="block w-full text-white text-center font-bold text-base py-4 rounded-xl tracking-wide transition-opacity active:opacity-80"
                        style={{ background: "#E63030" }}
                    >
                        Ver todos los viajes
                    </Link>
                    <Link
                        href="/proximas-salidas"
                        className="mt-3 block text-center text-sm font-medium"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                        Ver próximas fechas disponibles →
                    </Link>
                </div>

            </div>
        </section>
    );
}
