import { FaWhatsapp } from "react-icons/fa";

const defaultMessage =
  "Hello Posture, I would like to know more about your furniture and sourcing services.";

function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^\d]/g, "");
}

function WhatsAppFloat() {
  const configuredPhoneNumber = import.meta.env.VITE_WHATSAPP_PHONE;
  const configuredMessage =
    import.meta.env.VITE_WHATSAPP_MESSAGE || defaultMessage;

  if (!configuredPhoneNumber) {
    return null;
  }

  const phoneNumber = normalizePhoneNumber(configuredPhoneNumber);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(configuredMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_-18px_rgba(37,211,102,0.7)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_22px_55px_-18px_rgba(37,211,102,0.82)] sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}

export default WhatsAppFloat;
