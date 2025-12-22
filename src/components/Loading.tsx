import { motion } from 'framer-motion';

export default function Loading({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom, #221912, #352618)',
      }}
    >
      <div className="text-center w-full">
        {/* Michael Jackson image sliding */}
        <motion.div
          className="loading-animation mb-8"
          initial={{ x: '-100%' }}
          animate={{ x: '100vw' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-amber-600/50 shadow-2xl">
            <img
              src="https://i.pinimg.com/736x/5d/e2/64/5de264d05cb658962d7a5a2a642fc0f4.jpg"
              alt="Michael Jackson"
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.3) contrast(1.1)' }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-amber-100 font-light text-2xl uppercase tracking-wider"
          style={{ 
            fontFamily: 'Georgia, serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          King of Pop
        </motion.p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </motion.div>
  );
}