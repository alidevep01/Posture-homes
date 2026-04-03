import emailjs from '@emailjs/browser'

type ContactEmailPayload = {
  name: string
  phone: string
  email: string
  message: string
}

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'Email sending is not configured yet. Add the EmailJS Vite variables before submitting the form.',
    )
  }

  return { serviceId, templateId, publicKey }
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()

  return emailjs.send(
    serviceId,
    templateId,
    {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      message: payload.message,
    },
    {
      publicKey,
      limitRate: {
        throttle: 1000,
      },
    },
  )
}
