const defaultWhatsAppMessage =
  'Hello Posture India, I would like to discuss a furniture requirement.'

export function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^\d]/g, '')
}

export function getWhatsAppUrl(message = defaultWhatsAppMessage) {
  const configuredPhoneNumber = import.meta.env.VITE_WHATSAPP_PHONE

  if (!configuredPhoneNumber) {
    return null
  }

  const phoneNumber = normalizePhoneNumber(configuredPhoneNumber)

  if (!phoneNumber) {
    return null
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

export const whatsappDefaultMessage = defaultWhatsAppMessage
