import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1, scale: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative flex items-center justify-center">
        {/* Rotating Red Glow Ring */}
        <motion.div
          className="absolute w-64 h-64 sm:w-72 sm:h-72 md:w-[500px] md:h-[500px] rounded-full border-[1px] border-[#e60023]/20"
          initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 360, opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          style={{
            boxShadow: "0 0 60px rgba(230, 0, 35, 0.1), inset 0 0 30px rgba(230, 0, 35, 0.05)",
          }}
        />

        <div className="flex items-center justify-center relative overflow-visible px-4 py-8 w-full max-w-4xl">
          {/* Metallic Shine Sweep */}
          <motion.div
            className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg]"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
          />

          {/* Image Logo */}
          <motion.img
            src="https://image2url.com/r2/default/images/1774617879393-b81595db-11cc-4a33-8ea9-2552b04eae17.png"
            alt="CRA F Logo"
            className="h-32 sm:h-40 md:h-64 lg:h-80 object-contain relative z-10 drop-shadow-2xl"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}
