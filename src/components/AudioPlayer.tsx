import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Minimize2 } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented, user interaction required');
        }
      };

      playAudio();
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isMinimized ? 'w-16 h-16' : 'w-80'
      } bg-black/90 border-2 border-gold rounded-lg p-4 backdrop-blur-sm`}
    >
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />

      {!isMinimized ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gold text-xs uppercase-spaced font-inter">Now Playing</span>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-gold hover:text-white transition-colors"
            >
              <Minimize2 size={16} />
            </button>
          </div>

          <div className="text-white text-sm font-inter">
            I Saw Mommy Kissing Santa Claus
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <div className="flex-1 flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-gold hover:text-white transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold"
                style={{
                  background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${
                    volume * 100
                  }%, #374151 ${volume * 100}%, #374151 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause size={24} className="text-gold" />
          ) : (
            <Play size={24} className="text-gold" />
          )}
        </button>
      )}
    </div>
  );
}
