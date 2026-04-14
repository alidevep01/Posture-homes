import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl, whatsappDefaultMessage } from "../utils/whatsapp";

function WhatsAppFloat() {
  const configuredMessage =
    import.meta.env.VITE_WHATSAPP_MESSAGE || whatsappDefaultMessage;
  const whatsappUrl = getWhatsAppUrl(configuredMessage);

  if (!whatsappUrl) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 sm:bottom-6 sm:right-6"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.06, 1],
          boxShadow: [
            "0 18px 45px -18px rgba(37,211,102,0.7)",
            "0 24px 58px -18px rgba(37,211,102,0.9)",
            "0 18px 45px -18px rgba(37,211,102,0.7)",
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.08 }}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white"
      >
        <FaWhatsapp className="h-7 w-7" />
      </motion.a>
    </motion.div>
  );
}

export default WhatsAppFloat;
