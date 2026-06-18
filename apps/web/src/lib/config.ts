export const siteConfig = {
    // ── Identidad ──────────────────────────────────────────────────────────
    name: "The Madness Expeditions",
    shortName: "The Madness",
    country: "Argentina",
    foundedYear: 2026,

    // ── Contacto ───────────────────────────────────────────────────────────
    whatsappPhone: "541132693505", // formato: código país + número sin espacios ni guiones
    instagramHandle: "madnessexpeditions",

    // ── Mensajes de WhatsApp por contexto ──────────────────────────────────
    whatsappMessages: {
        default: "Hola Pablo, me interesa una expedición",
        navbar: "Hola Pablo, me interesa conocer más sobre sus expediciones",
        beginners: "Hola Pablo, no sé por dónde empezar, ¿me podés orientar?",
        finalCta: "Hola Pablo, me gustaría saber más sobre expediciones para principiantes",
    },
} as const;

// ── Helpers ────────────────────────────────────────────────────────────────

export function waLink(message: keyof typeof siteConfig.whatsappMessages): string {
    return `https://wa.me/${siteConfig.whatsappPhone}?text=${encodeURIComponent(
        siteConfig.whatsappMessages[message]
    )}`;
}

export const instagramUrl = `https://instagram.com/${siteConfig.instagramHandle}`;
