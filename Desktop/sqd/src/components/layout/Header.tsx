import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "المزايا", to: "/features" },
    { label: "الأسعار", to: "/pricing" },
    { label: "تواصل معنا", to: "/contact" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-3 text-lg font-extrabold text-emerald-300">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-500/10 text-xl shadow-glow font-display">
                        ج
                    </span>
                    <div className="leading-tight">
                        <span className="block text-lg font-display tracking-tight text-white">جوهر</span>
                        <span className="block text-[11px] font-semibold text-emerald-200 uppercase tracking-[0.16em]" lang="en">
                            Jawhar
                        </span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-7 text-[15px] font-semibold text-slate-100 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="transition hover:text-emerald-200 hover:-translate-y-0.5 tracking-tight"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        to="/start"
                        className="hidden md:inline-flex items-center justify-center rounded-xl border border-white/15 bg-emerald-500 px-4 py-2 text-sm font-extrabold text-white shadow-md shadow-emerald-800/40 transition hover:-translate-y-0.5 hover:bg-emerald-600 font-display tracking-tight"
                    >
                        جرّب الآن مجاناً
                    </Link>
                    <button
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100 md:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label="قائمة الجوال"
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-4 md:hidden">
                    <div className="grid grid-cols-2 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-50 transition hover:border-emerald-300/40 hover:bg-emerald-500/10 tracking-tight"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <Link
                        to="/start"
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-emerald-900/40 transition hover:-translate-y-0.5 hover:bg-emerald-600 font-display tracking-tight"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ابدأ تجربتك المجانية
                    </Link>
                </div>
            )}
        </header>
    );
}
