import { motion } from "motion/react";
import { ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  delay?: number;
}

export function ContactCard({ icon, title, value, delay = 0 }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl glass-card p-4 sm:p-6 flex items-start gap-3 sm:gap-4 cursor-pointer"
    >
      {/* Red Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e60023]/0 via-[#e60023]/0 to-[#e60023]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Red Accent Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e60023] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />

      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#e60023] group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
          {title}
        </span>
        <span className="text-base sm:text-lg font-semibold text-gray-900">
          {value}
        </span>
      </div>
    </motion.div>
  );
}
