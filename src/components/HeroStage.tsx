import { useState, useEffect, useRef } from 'react';
import { Pause, Play } from 'lucide-react';

const FONT = 'Georgia, serif';
const MONO = '"Courier New", Courier, monospace';
const ACCENT_COLOR = '#FF8C00';

const DESKTOP_VIDEO = '/michael.mp4';
const DESKTOP_POSTER = 'https://i.pinimg.com/1200x/62/ca/1f/62ca1fc765101c0984d21e4644657be8.jpg';

const MOBILE_VIDEO = '/michael.mp4';
const MOBILE_POSTER = 'https://i.pinimg.com/736x/cf/b5/92/cfb592b2d75f1c385ac54737051a9fd2.jpg';

export default function MJImmersivePage() {
    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeVideo = isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO;
    const activePoster = isMobile ? MOBILE_POSTER : DESKTOP_POSTER;

    useEffect(() => {
        const checkDeviceWidth = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDeviceWidth();
        window.addEventListener('resize', checkDeviceWidth);
        return () => window.removeEventListener('resize', checkDeviceWidth);
    }, []);

    const togglePlayPause = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black select-none flex items-center">

            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden opacity-60">
                <video
                    ref={videoRef}
                    key={activeVideo}
                    src={activeVideo}
                    poster={activePoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    controls={false}
                    className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-105"
                />
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/60 z-20" />

            {/* Content */}
            <div className="absolute inset-y-0 left-0 z-30 w-full md:max-w-2xl pl-5 md:pl-6 pr-6 flex flex-col justify-center h-full">
                <div>

                    {/* Tag — two lines on mobile, one line on desktop */}
                    <p
                        className="font-bold uppercase tracking-[0.25em] mb-4 block text-left"
                        style={{ color: ACCENT_COLOR, fontFamily: MONO, fontSize: isMobile ? '11px' : '12px' }}
                    >
                        {isMobile ? (
                            <>From the Imagination<br />of a Devoted Fan</>
                        ) : (
                            'From the Imagination of a Devoted Fan'
                        )}
                    </p>

                    <h1
                        className="text-2xl md:text-4xl text-white font-normal leading-tight tracking-tight mb-4 text-left"
                        style={{ fontFamily: FONT }}
                    >
                        Comes a Website Like No Other. <br />
                        <span className="italic font-light text-neutral-300">Protecting His Extraordinary Legacy.</span>
                    </h1>

                    <p
                        className="text-[12px] md:text-[13px] text-neutral-400 font-normal tracking-wide uppercase text-left"
                        style={{ fontFamily: MONO }}
                    >
                        In Defense of the King
                    </p>

                </div>
            </div>

            {/* Pause / Play — right side, raised on mobile */}
            <div className="absolute bottom-20 md:bottom-6 right-6 z-40">
                <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                    {isPlaying
                        ? <Pause size={14} style={{ color: ACCENT_COLOR }} />
                        : <Play size={14} style={{ color: ACCENT_COLOR }} />
                    }
                </button>
            </div>

        </div>
    );
}