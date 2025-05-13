"use server"

import nodemailer from "nodemailer"

export async function sendContactEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    const to = (formData.get("to") as string) || "lejiei@gmail.com"

    if (!email || !message) {
      return {
        success: false,
        message: "Email and message are required.",
      }
    }

    // Configurar el transporte de Nodemailer con las credenciales proporcionadas
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lejiei@gmail.com", // En producción, usar process.env.EMAIL_USER
        pass: "koph tqfo oaim icvt", // En producción, usar process.env.EMAIL_PASSWORD
      },
    })

    // Configurar el contenido del email
    const mailOptions = {
      from: `"Formulario de Contacto BoyScout IA" <lejiei@gmail.com>`,
      to: to,
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${email}`,
      text: `Mensaje de: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #7e22ce;">Nuevo mensaje de contacto</h2>
          <p><strong>De:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f4ff; border-left: 4px solid #7e22ce; border-radius: 4px;">
            <p>${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Este mensaje fue enviado desde el formulario de contacto de BoyScout IA.</p>
        </div>
      `,
    }

    // Enviar el email (ahora descomentado para envío real)
    await transporter.sendMail(mailOptions)
    console.log("Email enviado correctamente a:", to)

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Te responderemos pronto.",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: `Error al enviar el email: ${error instanceof Error ? error.message : "Error desconocido"}`,
    }
  }
}
