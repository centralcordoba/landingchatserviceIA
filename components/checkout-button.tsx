"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface CheckoutButtonProps {
  children: React.ReactNode
  stripeUrl?: string
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  children,
  stripeUrl = "https://buy.stripe.com/abcXYZ123", // Reemplaza con tu URL real de Stripe Payment Link
}) => {
  const handleCheckout = () => {
    // Abre el Payment Link de Stripe en una nueva pestaña
    window.open(stripeUrl, "_blank")
  }

  return (
    <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={handleCheckout}>
      {children}
    </Button>
  )
}
