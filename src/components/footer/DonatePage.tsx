import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle, Heart, Globe, BookOpen } from 'lucide-react';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

// ─── Theme Hook ───────────────────────────────────────────────────────────────

function useTheme() {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(!document.documentElement.classList.contains('light-mode'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const onStorage = (e: StorageEvent) => {
            if (e.key === 'theme') setIsDark(e.newValue !== 'light');
        };
        window.addEventListener('storage', onStorage);

        return () => {
            observer.disconnect();
            window.removeEventListener('storage', onStorage);
        };
    }, []);

    return isDark;
}

// ─── Crypto Wallet Data ───────────────────────────────────────────────────────

const cryptoWallets = [
    { 
        id: 'btc', 
        name: 'Bitcoin', 
        symbol: 'BTC', 
        network: 'Bitcoin Network', 
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' // Replace with your real BTC address
    },
    { 
        id: 'eth', 
        name: 'Ethereum', 
        symbol: 'ETH', 
        network: 'ERC-20', 
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' // Replace with your real ETH address
    },
    { 
        id: 'usdt', 
        name: 'Tether', 
        symbol: 'USDT', 
        network: 'BEP-20 (BSC)', 
        address: '0x55d398326f99059fF775485246999027B3197955' // Replace with your real USDT address
    }
];

// ─── Main Donate Page Component ───────────────────────────────────────────────

export default function DonatePage() {
    const isDark = useTheme();
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const cardBg = isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF';

    const [copiedCoin, setCopiedCoin] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Robust copy function guaranteed to work across devices
    const handleCopy = async (address: string, coinId: string) => {
        try {
            await navigator.clipboard.writeText(address);
            triggerSuccess(coinId);
        } catch (err) {
            const textArea = document.createElement("textarea");
            textArea.value = address;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                triggerSuccess(coinId);
            } catch (e) {
                console.error("Copy failed", e);
            }
            document.body.removeChild(textArea);
        }
    };

    const triggerSuccess = (coinId: string) => {
        setCopiedCoin(coinId);
        setTimeout(() => setCopiedCoin(null), 2500);
    };

    // Reusable Header Content to manage Desktop/Mobile split seamlessly
    const PageHeader = (
        <header className="mb-10 lg:mb-12">
            <span 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-5"
                style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
            >
                <Heart size={10} /> Donations
            </span>
            <h1 className="text-3xl md:text-5xl font-normal leading-tight mb-5" style={{ fontFamily: FONT, color: textColor }}>
                The Legacy of Giving
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70" style={{ fontFamily: FONT, color: textColor }}>
                We are a community-funded archive. 100% of all patron contributions go directly towards maintaining this digital museum and funding educational charities for children worldwide.
            </p>
        </header>
    );

    return (
        <div className="min-h-screen pb-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-28">
                
                {/* ─── Top Navigation ─── */}
                <div className="mb-8 border-b pb-4" style={{ borderColor }}>
                    <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
                        <ArrowLeft size={14} /> Return to Homepage
                    </Link>
                </div>

                {/* ─── Mobile-Only Header (Shows on top ONLY on mobile screens) ─── */}
                <div className="block lg:hidden mb-8">
                    {PageHeader}
                </div>

                {/* ─── Split Layout ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* LEFT COLUMN: The Mission (Order 2 on Mobile, Order 1 on Desktop) */}
                    <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
                        
                        {/* ─── Desktop-Only Header (Sits perfectly alongside the wallets) ─── */}
                        <div className="hidden lg:block">
                            {PageHeader}
                        </div>

                        <article className="prose prose-lg max-w-none text-lg md:text-xl font-light leading-relaxed opacity-90 mb-12" style={{ fontFamily: FONT, color: textColor }}>
                            <p className="mb-6">
                                Throughout history, the greatest measure of an artist's impact is not just in the records they sold, but in the lives they touched. In keeping with the humanitarian spirit of the era we document, this archive is dedicated to giving back.
                            </p>
                            
                            <p className="mb-10">
                                When you choose to become a patron, your digital contribution bypasses traditional banking fees, allowing your funds to go directly to the source. We actively partner with on-the-ground NGOs to provide underprivileged school children with vital resources.
                            </p>

                            {/* Impact Image Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <div className="rounded-[16px] overflow-hidden border bg-zinc-900 aspect-[4/3]" style={{ borderColor }}>
                                    <img 
                                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" 
                                        alt="Children studying" 
                                        className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                                <div className="rounded-[16px] overflow-hidden border bg-zinc-900 aspect-[4/3]" style={{ borderColor }}>
                                    <img 
                                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" 
                                        alt="Educational supplies" 
                                        className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                    />
                                </div>
                            </div>

                            <h3 className="text-2xl font-normal mb-6" style={{ fontFamily: FONT, color: textColor }}>
                                Where Your Contribution Goes
                            </h3>
                            
                            <ul className="list-none pl-0 space-y-6">
                                <li className="flex gap-4 items-start">
                                    <BookOpen size={20} className="shrink-0 mt-1" style={{ color: ACCENT_COLOR }} />
                                    <span className="text-base md:text-lg"><strong>Educational Grants:</strong> Supplying textbooks, writing materials, and daily meals to primary schools in developing regions.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <Globe size={20} className="shrink-0 mt-1" style={{ color: ACCENT_COLOR }} />
                                    <span className="text-base md:text-lg"><strong>Digital Access:</strong> Providing refurbished laptops and internet access to classrooms to bridge the global digital divide.</span>
                                </li>
                            </ul>
                        </article>

                    </div>

                    {/* RIGHT COLUMN: The Patronage Desk / Wallets (Order 1 on Mobile, Order 2 on Desktop) */}
                    <aside className="lg:col-span-5 order-1 lg:order-2">
                        <div className="sticky top-10 flex flex-col">
                            
                            <div className="flex items-center gap-3 mb-6 border-b pb-4" style={{ borderColor }}>
                                <Heart size={16} style={{ color: ACCENT_COLOR }} />
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: textColor }}>
                                    Make a Contribution
                                </span>
                            </div>

                            <p className="text-base font-light leading-relaxed opacity-70 mb-8" style={{ fontFamily: FONT, color: textColor }}>
                                We exclusively accept contributions via cryptocurrency to ensure global accessibility and transparency. Select your preferred network below.
                            </p>

                            <div className="flex flex-col gap-6">
                                {cryptoWallets.map((wallet) => (
                                    <div key={wallet.id} className="p-6 md:p-8 rounded-[24px] border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor, backgroundColor: cardBg }}>
                                        
                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[18px] md:text-[20px] font-medium" style={{ fontFamily: FONT, color: textColor }}>
                                                    {wallet.name}
                                                </span>
                                                <span className="px-2 py-1 rounded-[6px] text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-black/10 dark:bg-white/10" style={{ fontFamily: MONO, color: textColor }}>
                                                    {wallet.symbol}
                                                </span>
                                            </div>
                                            <span className="text-[10px] md:text-[11px] uppercase tracking-widest opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                                {wallet.network}
                                            </span>
                                        </div>

                                        {/* Full Address Display */}
                                        <p className="text-[13px] md:text-[15px] leading-relaxed break-all opacity-80 select-all mb-6" style={{ fontFamily: MONO, color: textColor }}>
                                            {wallet.address}
                                        </p>
                                        
                                        {/* Copy Button */}
                                        <button 
                                            onClick={() => handleCopy(wallet.address, wallet.id)}
                                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all"
                                            style={{ 
                                                backgroundColor: copiedCoin === wallet.id ? ACCENT_COLOR : 'transparent', 
                                                border: `1px solid ${copiedCoin === wallet.id ? ACCENT_COLOR : borderColor}`, 
                                                color: copiedCoin === wallet.id ? '#000' : textColor 
                                            }}
                                        >
                                            {copiedCoin === wallet.id ? (
                                                <><CheckCircle size={14} /> Address Copied</>
                                            ) : (
                                                <><Copy size={14} /> Copy Address</>
                                            )}
                                        </button>

                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 pt-6 border-t text-center" style={{ borderColor }}>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40" style={{ fontFamily: MONO, color: textColor }}>
                                    Thank you for your generosity
                                </p>
                            </div>

                        </div>
                    </aside>
                </div>

                {/* ─── Bottom Navigation ─── */}
                <footer className="mt-16 pt-8 border-t flex justify-start" style={{ borderColor }}>
                    <Link 
                        to="/" 
                        className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase transition-all no-underline hover:text-orange-500"
                        style={{ fontFamily: MONO, color: textColor, opacity: 0.7 }}
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                        Back to Homepage
                    </Link>
                </footer>

            </div>
        </div>
    );
}