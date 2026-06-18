export interface TestimonialProps {
    initials: string;
    name: string;
    text: string;
    trip: string;
    date: string;
    avatarColor: string;
}

export default function TestimonialCard({
    initials,
    name,
    text,
    trip,
    date,
    avatarColor,
}: TestimonialProps) {
    return (
        <div
            className="rounded-2xl p-4 lg:p-6 border"
            style={{
                background: "rgba(13,27,42,0.8)",
                borderColor: "rgba(26,58,92,0.3)",
            }}
        >
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
                {/* Avatar inicial */}
                <div
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
                    style={{ background: avatarColor }}
                >
                    {initials}
                </div>
                <div>
                    <div className="font-semibold text-sm text-white">{name}</div>
                    <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
            </div>
            <p className="text-sm leading-relaxed mb-2 lg:mb-3" style={{ color: "rgba(255,255,255,0.85)" }}>
                &ldquo;{text}&rdquo;
            </p>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {trip} · {date}
            </div>
        </div>
    );
}
