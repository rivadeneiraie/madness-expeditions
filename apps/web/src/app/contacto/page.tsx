import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import ContactoPage from "@/components/views/ContactoPage";

export const metadata = {
    title: "Contacto — Madness Expeditions",
    description:
        "Consultá directamente con Madness Expeditions. WhatsApp o formulario — sin intermediarios, sin equipo de ventas. Una conversación directa sobre tu próxima expedición.",
};

export default function ContactoRoute() {
    return (
        <>
            <Navbar />
            <main>
                <ContactoPage />
            </main>
            <Footer />
            <FloatingWhatsAppButton />
        </>
    );
}
