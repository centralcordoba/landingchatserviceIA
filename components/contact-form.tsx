"use client"

import { useState, useRef, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { sendContactEmail } from "@/app/actions"

interface ContactFormProps {
  translations: {
    yourEmail: string
    emailPlaceholder: string
    message: string
    messagePlaceholder: string
    send: string
    sending: string
    contactSuccessMessage: string
    contactErrorMessage: string
  }
}

export function ContactForm({ translations }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const formData = new FormData(formRef.current)
      const result = await sendContactEmail(formData)
      setFormStatus(result)

      if (result.success) {
        formRef.current.reset()
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: `${translations.contactErrorMessage} ${error instanceof Error ? error.message : ""}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 bg-white p-6 rounded-xl shadow-sm border border-purple-100">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
          >
            {translations.yourEmail}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={translations.emailPlaceholder}
            className="flex h-10 w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
          >
            {translations.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder={translations.messagePlaceholder}
            className="flex min-h-[120px] w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        </div>
        <input type="hidden" name="to" value="lejiei@gmail.com" />
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {translations.sending}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              {translations.send}
            </span>
          )}
        </Button>
      </form>
      {formStatus && (
        <div
          className={`p-3 rounded-md ${
            formStatus.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {formStatus.message}
        </div>
      )}
    </div>
  )
}
