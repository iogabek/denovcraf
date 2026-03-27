import { motion } from "motion/react";
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  delay?: number;
}

export function SocialButton({ icon, label, href, delay = 0 }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center justify-between w-full p-3 sm:p-4 rounded-2xl glass-card overflow-hidden cursor-pointer"
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e60023]/0 via-[#e60023]/5 to-[#e60023]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Left Accent Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e60023] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />

      <div className="flex items-center gap-3 sm:gap-4 relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center text-gray-600 group-hover:text-[#e60023] group-hover:bg-white transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
        <span className="font-semibold text-base sm:text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
      </div>

      <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full border border-gray-200/80 flex items-center justify-center text-gray-400 group-hover:border-[#e60023]/30 group-hover:text-[#e60023] group-hover:bg-white/50 transition-all duration-300 shadow-sm">
        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </motion.a>
  );
}
