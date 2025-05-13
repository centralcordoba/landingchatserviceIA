"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Shield } from "lucide-react"

interface TokenValidatorProps {
  onValidate: (token: string) => void
}

export function TokenValidator({ onValidate }: TokenValidatorProps) {
  const [token, setToken] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onValidate(token)
  }

  return (
    <div className="rounded-lg border border-purple-100 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="token" className="block text-sm font-medium text-slate-700">
            Token JWT
          </label>
          <Textarea
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Pega tu token JWT aquí..."
            className="min-h-[120px] w-full resize-y border-purple-200"
          />
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          <Shield className="mr-2 h-4 w-4" />
          Validar Token
        </Button>
      </form>
    </div>
  )
}
