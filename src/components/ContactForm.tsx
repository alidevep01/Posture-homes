import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, MessageSquareText, Phone, UserRound } from 'lucide-react'
import { sendContactEmail } from '../utils/email'

type ContactFormValues = {
  name: string
  phone: string
  email: string
  message: string
}

type SubmissionState =
  | { type: 'idle'; message: '' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

const fieldBaseClassName =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900'

function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    type: 'idle',
    message: '',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setSubmissionState({ type: 'idle', message: '' })

    try {
      await sendContactEmail(values)
      setSubmissionState({
        type: 'success',
        message: 'Your enquiry has been sent. We will get back to you shortly.',
      })
      reset()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now. Please try again.'

      setSubmissionState({ type: 'error', message })
    }
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] sm:p-8">
      <div className="max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
          Contact form
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          Request a sourcing quote
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Share your furniture requirements and our team will respond with the
          next steps.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <UserRound className="h-4 w-4" />
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className={fieldBaseClassName}
              {...register('name', {
                required: 'Name is required.',
              })}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <Phone className="h-4 w-4" />
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              className={fieldBaseClassName}
              {...register('phone', {
                required: 'Phone is required.',
              })}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <Mail className="h-4 w-4" />
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={fieldBaseClassName}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address.',
              },
            })}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <MessageSquareText className="h-4 w-4" />
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Tell us about your project, quantity, and preferred furniture categories."
            className={`${fieldBaseClassName} resize-none`}
            {...register('message', {
              required: 'Message is required.',
            })}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {submissionState.type !== 'idle' && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              submissionState.type === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {submissionState.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-40 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Sending...' : 'Get Quote'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
