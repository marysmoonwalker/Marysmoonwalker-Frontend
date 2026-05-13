import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GitMerge } from 'lucide-react';
import { familyData } from './FamilyPage'; // We import the data array from the index page

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

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
        return () => { observer.disconnect(); window.removeEventListener('storage', onStorage); };
    }, []);

    return isDark;
}

export default function FamilyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isDark = useTheme();
    
    const bg = isDark ? '#0A0A0A' : '#F8F9FA';
    const textColor = isDark ? '#FFFFFF' : '#111111';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    // Find the member from the URL id
    const member = familyData.find(m => m.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
        // If someone types an invalid ID like /family/unknown, redirect them to the family tree
        if (!member) {
            navigate('/family', { replace: true });
        }
    }, [id, member, navigate]);

    if (!member) return null;

    return (
        <div className="min-h-screen pb-16 transition-colors duration-500" style={{ backgroundColor: bg }}>
            <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-28">
                
                {/* ─── Top Navigation ─── */}
                <div className="mb-12 border-b pb-4" style={{ borderColor }}>
                    <Link to="/family" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ fontFamily: MONO, color: textColor, opacity: 0.6 }}>
                        <ArrowLeft size={14} /> Back to Family Tree
                    </Link>
                </div>

                {/* ─── Hero Header ─── */}
                <header className="mb-12 md:mb-16">
                    <span 
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[9px] font-bold uppercase tracking-widest mb-4"
                        style={{ backgroundColor: ACCENT_COLOR, color: '#000', fontFamily: MONO }}
                    >
                        <GitMerge size={10} /> {member.relation}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-4" style={{ fontFamily: FONT, color: textColor }}>
                        {member.name}
                    </h1>
                </header>

                {/* ─── Detailed Split Layout ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT COLUMN: Hero Portrait */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-10 rounded-[20px] overflow-hidden border bg-zinc-900 aspect-[4/5] shadow-xl" style={{ borderColor }}>
                            <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 hover:grayscale-0 hover:opacity-100"
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Biography Text */}
                    <div className="lg:col-span-7 flex flex-col pt-2">
                        
                        <div className="text-xl md:text-2xl font-light leading-relaxed opacity-90 mb-10 pb-10 border-b" style={{ fontFamily: FONT, color: textColor, borderColor }}>
                            "{member.excerpt}"
                        </div>

                        {/* This is placeholder detailed text. You can make this dynamic per member if you expand your data array later! */}
                        <article className="prose prose-lg max-w-none text-base md:text-lg font-light leading-relaxed opacity-80 space-y-6" style={{ fontFamily: FONT, color: textColor }}>
                            <p>
                                The story of the Jackson dynasty is inextricably linked with the life and contributions of {member.name}. To understand the monumental impact of Michael Jackson, one must also look closely at the roots from which he grew and the family members who shared the stage, the struggles, and the unparalleled global spotlight.
                            </p>
                            <p>
                                As {member.relation.toLowerCase()} to the King of Pop, {member.name} occupied a unique position in music history. They navigated the complexities of unimaginable fame, while maintaining a deeply personal connection to the man the rest of the world saw only as a phenomenon.
                            </p>
                            
                            <h3 className="text-2xl font-normal mt-10 mb-4" style={{ fontFamily: FONT, color: textColor }}>
                                Impact & Legacy
                            </h3>
                            <p>
                                Their individual path was not without immense challenges. The intense scrutiny of the media and the weight of the family name required extraordinary resilience. Yet, {member.name} carved out a space that contributed heavily to the cultural blueprint established by the family in Gary, Indiana. 
                            </p>
                            <p>
                                Today, their presence continues to serve as a vital link to the golden era of the Jackson 5 and the subsequent explosion of Michael's solo career, ensuring the true, unvarnished history of the dynasty is preserved for future generations.
                            </p>
                        </article>
                    </div>

                </div>

                {/* ─── Bottom Navigation ─── */}
                <footer className="mt-24 pt-8 border-t flex justify-start" style={{ borderColor }}>
                    <Link 
                        to="/family" 
                        className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase transition-all no-underline hover:text-orange-500"
                        style={{ fontFamily: MONO, color: textColor, opacity: 0.7 }}
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                        Back to The Dynasty
                    </Link>
                </footer>

            </div>
        </div>
    );
}