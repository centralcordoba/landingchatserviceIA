"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard } from "lucide-react"

interface PaymentCardProps {
  title: string
  price: string
  features: string[]
  stripeUrl: string
  buttonText: string
}

export function PaymentCard({ title, price, features, stripeUrl, buttonText }: PaymentCardProps) {
  const handlePayment = () => {
    window.open(stripeUrl, "_blank")
  }

  return (
    <Card className="border-purple-300 shadow-md bg-purple-50 max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-purple-900">{title}</CardTitle>
        <CardDescription className="text-3xl font-bold text-purple-700 mt-2">{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-600">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePayment} className="w-full bg-purple-600 hover:bg-purple-700">
          <CreditCard className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
