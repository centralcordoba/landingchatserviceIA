"use server"

export async function sendContactEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!email || !message) {
      return {
        success: false,
        message: "Email and message are required.",
      }
    }

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, you would integrate with an email service here
    // Examples: SendGrid, Resend, AWS SES, etc.
    console.log("Email submission:", { email, message })

    return {
      success: true,
      message: "¡Tu solicitud ha sido enviada! Te contactaremos pronto para agendar tu demo.",
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return {
      success: false,
      message: `Error al enviar tu solicitud. Por favor, inténtalo de nuevo.`,
    }
  }
}
