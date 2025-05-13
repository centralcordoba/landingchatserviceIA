import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, User, Calendar, Key } from "lucide-react"
import type { DecodedToken } from "@/lib/token-utils"

interface TokenDetailsProps {
  token: DecodedToken
  isValid: boolean
}

export function TokenDetails({ token, isValid }: TokenDetailsProps) {
  // Calcular tiempo restante o expirado
  const now = Math.floor(Date.now() / 1000)
  const timeRemaining = token.exp - now

  // Formatear fecha de expiración
  const expirationDate = new Date(token.exp * 1000).toLocaleString()

  // Formatear tiempo restante
  const formatTimeRemaining = () => {
    if (timeRemaining <= 0) return "Expirado"

    const days = Math.floor(timeRemaining / 86400)
    const hours = Math.floor((timeRemaining % 86400) / 3600)
    const minutes = Math.floor((timeRemaining % 3600) / 60)
    const seconds = timeRemaining % 60

    const parts = []
    if (days > 0) parts.push(`${days} día${days !== 1 ? "s" : ""}`)
    if (hours > 0) parts.push(`${hours} hora${hours !== 1 ? "s" : ""}`)
    if (minutes > 0) parts.push(`${minutes} minuto${minutes !== 1 ? "s" : ""}`)
    if (seconds > 0) parts.push(`${seconds} segundo${seconds !== 1 ? "s" : ""}`)

    return parts.join(", ")
  }

  return (
    <div className="mt-8 space-y-6">
      <Card className={isValid ? "border-green-200" : "border-red-200"}>
        <CardHeader className={isValid ? "bg-green-50" : "bg-red-50"}>
          <CardTitle className="flex items-center">
            {isValid ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-green-700">Token Válido</span>
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-5 w-5 text-red-600" />
                <span className="text-red-700">Token Expirado</span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isValid ? "El token está activo y puede ser utilizado" : "El token ha expirado y ya no es válido"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500" />
              <div>
                <p className="font-medium text-slate-700">Estado del Token</p>
                <p className="text-sm text-slate-600">
                  {isValid ? (
                    <>
                      <Badge variant="outline" className="mr-2 bg-green-50 text-green-700">
                        Activo
                      </Badge>
                      Tiempo restante: {formatTimeRemaining()}
                    </>
                  ) : (
                    <>
                      <Badge variant="outline" className="mr-2 bg-red-50 text-red-700">
                        Expirado
                      </Badge>
                      Expiró hace: {formatTimeRemaining().replace("Expirado", "")}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500" />
              <div>
                <p className="font-medium text-slate-700">Fecha de Expiración</p>
                <p className="text-sm text-slate-600">{expirationDate}</p>
              </div>
            </div>

            {token.name && (
              <div className="flex items-start gap-2">
                <User className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500" />
                <div>
                  <p className="font-medium text-slate-700">Usuario</p>
                  <p className="text-sm text-slate-600">{token.name}</p>
                </div>
              </div>
            )}

            {token.sub && (
              <div className="flex items-start gap-2">
                <Key className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500" />
                <div>
                  <p className="font-medium text-slate-700">Subject (sub)</p>
                  <p className="text-sm text-slate-600 break-all">{token.sub}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Completa del Token</CardTitle>
          <CardDescription>Todos los claims contenidos en el token</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="max-h-96 overflow-auto rounded-lg bg-slate-50 p-4 text-xs">
            {JSON.stringify(token, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
