import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-surface-dark/50 border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="text-primary">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <span className="text-lg font-bold tracking-tighter uppercase">
                                VehicleHub
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                            Crafting the next generation of urban and long-distance mobility
                            through luxury, efficiency, and intelligence.
                        </p>
                        <div className="flex gap-4">
                            <a
                                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary transition-colors"
                                href="#"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                            {/* Other social icons... */}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">
                            Platform
                        </h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li>
                                <Link className="hover:text-white transition-colors" href="/fleet">
                                    Fleet Explorer
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="/#how-it-works">
                                    How it Works
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="#">
                                    Mobile App
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="#">
                                    Corporate Accounts
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
                                    About Mission
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="#">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="#">
                                    Sustainability
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition-colors" href="/contact">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
                    <p>© 2024 VehicleHub Mobility Inc.</p>
                    <div className="flex gap-8">
                        <Link className="hover:text-white transition-colors" href="/privacy">
                            Privacy Policy
                        </Link>
                        <Link className="hover:text-white transition-colors" href="/terms">
                            Terms of Service
                        </Link>
                        <button className="hover:text-white transition-colors">
                            Cookie Settings
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
