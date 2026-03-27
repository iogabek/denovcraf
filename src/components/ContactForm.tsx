import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "motion/react";
import { LoaderCircle, Send } from "lucide-react";

const TELEGRAM_BOT_TOKEN = "8272273661:AAH8oTWXNh9H2DmOlPyXUv6NSUPJM1Yg62s";
const TELEGRAM_CHAT_IDS = ["7217473568", "5437237624", "549883287"];
const APP_URL = "";
const DEFAULT_PHONE_PREFIX = "+998";
const UZBEKISTAN_PHONE_LENGTH = 12;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizeUzPhone(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  const localDigits = digitsOnly.startsWith("998")
    ? digitsOnly.slice(3, UZBEKISTAN_PHONE_LENGTH)
    : digitsOnly.slice(0, 9);

  return `${DEFAULT_PHONE_PREFIX}${localDigits}`;
}

function formatUzPhone(value: string) {
  const normalizedPhone = normalizeUzPhone(value);
  const localDigits = normalizedPhone.slice(DEFAULT_PHONE_PREFIX.length);
  let formattedPhone = DEFAULT_PHONE_PREFIX;

  if (localDigits.length > 0) {
    formattedPhone += ` (${localDigits.slice(0, 2)}`;
  }

  if (localDigits.length >= 2) {
    formattedPhone += ")";
  }

  if (localDigits.length > 2) {
    formattedPhone += ` ${localDigits.slice(2, 5)}`;
  }

  if (localDigits.length > 5) {
    formattedPhone += ` ${localDigits.slice(5, 7)}`;
  }

  if (localDigits.length > 7) {
    formattedPhone += ` ${localDigits.slice(7, 9)}`;
  }

  return formattedPhone;
}

function isCompleteUzPhone(value: string) {
  return normalizeUzPhone(value).replace(/\D/g, "").length === UZBEKISTAN_PHONE_LENGTH;
}

function isLocalHostname(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]"
  );
}

function buildCallButtonUrl(phone: string) {
  const baseUrl = APP_URL || window.location.origin;
  const url = new URL(baseUrl);

  if (!["http:", "https:"].includes(url.protocol) || isLocalHostname(url.hostname)) {
    return null;
  }

  url.searchParams.set("call", normalizeUzPhone(phone));
  url.hash = "call";
  return url.toString();
}

function buildTelegramMessage({
  name,
  phone,
  message,
}: {
  name: string;
  phone: string;
  message: string;
}) {
  const sentAt = new Date().toLocaleString("uz-UZ", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return [
    "<b>📩 Yangi murojaat</b>",
    "",
    `<b>👤 Ism:</b> ${escapeHtml(name)}`,
    `<b>📞 Telefon:</b> ${escapeHtml(phone)}`,
    `<b>💬 Xabar:</b> ${escapeHtml(message)}`,
    `<b>🕒 Yuborilgan vaqt:</b> ${escapeHtml(sentAt)}`,
  ].join("\n");
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: DEFAULT_PHONE_PREFIX,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;

    if (id === "phone") {
      setFormData((current) => ({
        ...current,
        phone: formatUzPhone(value),
      }));
      return;
    }

    setFormData((current) => ({
      ...current,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isCompleteUzPhone(formData.phone)) {
      setStatus({
        type: "error",
        message: "Telefon raqamini to'liq kiriting.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const formattedPhone = formatUzPhone(formData.phone);
      const normalizedPhone = normalizeUzPhone(formData.phone);
      const callButtonUrl = buildCallButtonUrl(normalizedPhone);
      const payload = {
        text: buildTelegramMessage({
          ...formData,
          phone: formattedPhone,
        }),
        parse_mode: "HTML",
        disable_web_page_preview: true,
        ...(callButtonUrl
          ? {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "📞 Qo'ng'iroq qilish",
                      url: callButtonUrl,
                    },
                  ],
                ],
              },
            }
          : {}),
      };

      const responses = await Promise.all(
        TELEGRAM_CHAT_IDS.map(async (chatId) => {
          const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                chat_id: chatId,
                ...payload,
              }),
            },
          );

          const result = await response.json();

          if (!response.ok || !result.ok) {
            throw new Error(result.description || "Xabar yuborilmadi.");
          }

          return result;
        }),
      );

      if (responses.length === 0) {
        throw new Error("Xabar yuboriladigan Telegram ID topilmadi.");
      }

      setFormData({
        name: "",
        phone: "",
        message: "",
      });
      setStatus({
        type: "success",
        message: "Xabaringiz Telegram'ga muvaffaqiyatli yuborildi.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Xabar yuborishda xatolik yuz berdi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 w-full max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-5">
        <div className="floating-label-group">
          <input
            type="text"
            id="name"
            placeholder=" "
            className="glass-input w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl text-gray-900"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            autoComplete="name"
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
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            autoComplete="tel"
            inputMode="numeric"
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
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          <label htmlFor="message" className="floating-label">
            Your Message
          </label>
        </div>
      </div>

      {status.type !== "idle" ? (
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-medium backdrop-blur-md border ${
            status.type === "success"
              ? "border-emerald-200/80 bg-emerald-50/80 text-emerald-700"
              : "border-red-200/80 bg-red-50/80 text-red-700"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#e60023] to-[#ff3355] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 shadow-[0_8px_20px_rgba(230,0,35,0.3)] hover:shadow-[0_12px_30px_rgba(230,0,35,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
        
        <span className="relative z-10 tracking-wide text-lg">
          {isSubmitting ? "Sending..." : "Send Message"}
        </span>
        {isSubmitting ? (
          <LoaderCircle className="w-5 h-5 relative z-10 animate-spin" />
        ) : (
          <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </motion.button>
    </motion.form>
  );
}
