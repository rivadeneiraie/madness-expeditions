import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import CatalogoViajes from "@/components/views/CatalogoViajes";
import { getAllTrips } from "@/lib/trips/api";

export const metadata = {
    title: "Viajes — Madness Expeditions",
    description: "Catálogo completo de expediciones y ascensos guiados en Argentina. Todos los niveles, con guía incluido.",
};

export default async function ViajesPage() {
    const trips = await getAllTrips();

    return (
        <>
            <Navbar />
            <main>
                <CatalogoViajes trips={trips} />
            </main>
            <Footer />
            <FloatingWhatsAppButton />
        </>
    );
}
