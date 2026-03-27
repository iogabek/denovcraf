import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import { Phone, MapPin, Instagram, Youtube, Send } from "lucide-react";
import { Loader } from "./components/Loader";
import { ContactCard } from "./components/ContactCard";
import { SocialButton } from "./components/SocialButton";
import { ContactForm } from "./components/ContactForm";
import { Background3DElements } from "./components/Background3DElements";

// Custom Telegram Icon since lucide-react doesn't have it
const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <div className="min-h-screen flex flex-col relative font-sans selection:bg-[#e60023] selection:text-white">
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* 3D Floating Elements Background */}
      <Background3DElements />

      {/* Parallax Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="fixed inset-0 pointer-events-none z-[-1]"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#e60023]/5 to-transparent blur-3xl opacity-50 animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-gray-300/20 to-transparent blur-3xl opacity-50 animate-float" style={{ animationDelay: "2s" }} />
      </motion.div>

      <main className="relative z-10 container mx-auto px-3 sm:px-4 py-8 md:py-16 lg:py-24 flex flex-col items-center justify-center flex-grow">
        
        {/* Main Glass Container with 3D Perspective */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10, scale: 0.95 }}
          animate={!loading ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ perspective: "1000px" }}
          className="w-full max-w-5xl glass-panel rounded-[2rem] p-5 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden glass-reflection"
        >
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-20 relative z-20 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={!loading ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Subtle glow behind the logo */}
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 pointer-events-none" />
              
              <img 
                src="https://image2url.com/r2/default/images/1774617879393-b81595db-11cc-4a33-8ea9-2552b04eae17.png" 
                alt="CRA F Logo" 
                className="h-32 sm:h-48 md:h-72 lg:h-[320px] object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.2)] relative z-10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 relative z-20">
            
            {/* Left Column: Contact Info & Socials */}
            <div className="flex flex-col gap-8 md:gap-10">
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-bold text-gray-900 mb-8"
                >
                  Get in Touch
                </motion.h2>
                
                <ContactCard
                  icon={<Phone className="w-6 h-6" />}
                  title="Phone"
                  value="+998 90 123 45 67"
                  delay={0.2}
                />
                <ContactCard
                  icon={<MapPin className="w-6 h-6" />}
                  title="Address"
                  value="Denov, Surxondaryo, Uzbekistan"
                  delay={0.4}
                />
              </div>

              <div className="pt-8 border-t border-gray-200/50">
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6"
                >
                  Connect With Us
                </motion.h3>
                <div className="flex flex-col gap-4">
                  <SocialButton icon={<Instagram className="w-6 h-6" />} label="Instagram" href="#" delay={0.6} />
                  <SocialButton icon={<TelegramIcon />} label="Telegram" href="#" delay={0.7} />
                  <SocialButton icon={<Youtube className="w-6 h-6" />} label="YouTube" href="#" delay={0.8} />
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white/20 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] border border-white/40 relative overflow-hidden"
              >
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                
                <h2 className="text-2xl font-bold text-gray-900 mb-8 relative z-10">
                  Send a Message
                </h2>
                <div className="relative z-10">
                  <ContactForm />
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={!loading ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 w-full py-6 mt-auto border-t border-gray-200/40 bg-white/20 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium tracking-wide">
          <span>Dasturlash xizmati:</span>
          <span className="text-gray-900 font-semibold">Isoqov Og'abek</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <a 
            href="tel:+998886998878" 
            className="text-[#e60023] hover:text-[#ff3355] transition-colors font-semibold"
          >
            +998 88 699 88 78
          </a>
        </div>
      </motion.footer>
    </div>
  );
}
