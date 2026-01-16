import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-surface-dark/50 border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/logo.png"
                                    alt="VehicleHub Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-lg font-bold tracking-tighter uppercase text-slate-100">
                                VehicleHub
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                            Crafting the next generation of urban and long-distance mobility
                            through luxury, efficiency, and intelligence.
                        </p>
                        <div className="flex gap-4">
                            <a
                                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                                href="https://twitter.com/vehiclehub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                            <a
                                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                                href="https://instagram.com/vehiclehub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>
                            </a>
                            <a
                                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                                href="https://linkedin.com/company/vehiclehub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">
                            Platform
                        </h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li>
                                <Link className="hover:text-white transition-colors" href="/explore">
                                    Fleet Explorer
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="/#how-it-works">
                                    How it Works
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="/privacy">
                                    Privacy & Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">
                            Company
                        </h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li>
                                <Link className="hover:text-white transition-colors" href="/about">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="/contact">
                                    Contact Support
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="/#faq">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
