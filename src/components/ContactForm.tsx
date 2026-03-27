import { motion } from "motion/react";
import { Send } from "lucide-react";

export function ContactForm() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 w-full max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-5">
        <div className="floating-label-group">
          <input
            type="text"
            id="name"
            placeholder=" "
            className="glass-input w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl text-gray-900"
            required
          />
          <label htmlFor="name" className="floating-label">
            Full Name
          </label>
        </div>

        <div className="floating-label-group">
          <input
            type="tel"
            id="phone"
            placeholder=" "
            className="glass-input w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl text-gray-900"
            required
          />
          <label htmlFor="phone" className="floating-label">
            Phone Number
          </label>
        </div>

        <div className="floating-label-group">
          <textarea
            id="message"
            placeholder=" "
            rows={4}
            className="glass-input w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl text-gray-900 resize-none"
            required
          />
          <label htmlFor="message" className="floating-label">
            Your Message
          </label>
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#e60023] to-[#ff3355] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 shadow-[0_8px_20px_rgba(230,0,35,0.3)] hover:shadow-[0_12px_30px_rgba(230,0,35,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
        
        <span className="relative z-10 tracking-wide text-lg">Send Message</span>
        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>
    </motion.form>
  );
}
