import { motion } from 'framer-motion';

export default function Foreword() {
  const desktopBgImage = 'https://i.pinimg.com/1200x/bf/db/14/bfdb14c2f50bce2621894b86024e75ae.jpg';
  const mobileBgImage = 'https://i.pinimg.com/736x/93/e2/ec/93e2ec8d5fd0d2f31b26bf582b814c06.jpg';

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden" style={{ backgroundColor: '#A89070' }}>
      {/* Background Images*/}
      <div
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(168, 144, 112, 0.15), rgba(168, 144, 112, 0.25)), url(${desktopBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
        }}
      />
      
      <div
        className="block md:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(168, 144, 112, 0.15), rgba(168, 144, 112, 0.25)), url(${mobileBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
        }}
      />

      {/* Subtle overlay to enhance cream tones - very light */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A89070]/20 to-[#A89070]/30 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <div className="relative px-4 md:px-16 py-6 md:py-8">
          {/* Opening quote */}
          <span className="text-yellow-700 text-6xl md:text-8xl font-serif absolute top-2 md:top-0 left-2 md:left-4 opacity-30 leading-none">
            &ldquo;
          </span>

          <blockquote className="text-lg md:text-xl lg:text-2xl font-serif italic leading-relaxed text-amber-950 mb-8 relative z-10 pt-12 md:pt-8 px-4">
            I've been a Michael Jackson fan since 1988, when I attended my first concert at age
            6. I've seen him perform on every world tour, witnessed him receive the Artist of the
            Millennium award in Germany in 2002, and felt the magic every single time. This site is
            my tribute to the greatest entertainer who ever lived and his incredible family legacy.
          </blockquote>

          {/* Closing quote */}
          <span className="text-yellow-700 text-6xl md:text-8xl font-serif absolute bottom-2 md:bottom-0 right-2 md:right-4 opacity-30 leading-none">
            &rdquo;
          </span>
        </div>

        <div className="mt-12">
          <p className="font-serif text-2xl md:text-3xl text-yellow-700 mb-2">Mary Mareike</p>
          <p className="text-stone-700 text-sm uppercase tracking-wider font-medium">
            Moonwalker Since 1988
          </p>
        </div>
      </motion.div>
    </section>
  );
}