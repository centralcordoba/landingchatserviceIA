"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Shield,
  Zap,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Upload,
  Settings,
  LinkIcon,
  Heart,
  DollarSign,
  ShoppingCart,
  Building,
  Check,
  X,
  BarChart3,
} from "lucide-react"
import { useState, useRef, type FormEvent } from "react"
import { sendContactEmail } from "./actions"
import { ContactForm } from "@/components/contact-form"
import { decodeToken, type DecodedToken } from "@/lib/token-utils"

export default function LandingPage() {
  const [language, setLanguage] = useState("es")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [tokenData, setTokenData] = useState<{
    decoded: DecodedToken | null
    isValid: boolean
    error: string | null
  }>({
    decoded: null,
    isValid: false,
    error: null,
  })

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

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
        message: t[language].contactErrorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateToken = (token: string) => {
    try {
      if (!token.trim()) {
        setTokenData({
          decoded: null,
          isValid: false,
          error: "Por favor, ingresa un token",
        })
        return
      }

      const decoded = decodeToken(token)
      const now = Math.floor(Date.now() / 1000)
      const isValid = decoded.exp > now

      setTokenData({
        decoded,
        isValid,
        error: null,
      })
    } catch (error) {
      setTokenData({
        decoded: null,
        isValid: false,
        error: "Token inválido. Asegúrate de que es un token JWT válido.",
      })
    }
  }

  const t = {
    es: {
      // Navigation
      navHowItWorks: "Cómo Funciona",
      navUseCases: "Casos de Uso",
      navTechnology: "Tecnología",
      navPricing: "Precios",
      navContact: "Contacto",
      signIn: "Iniciar Sesión",
      tryDemo: "Ver Demo",

      // Hero Section - Exactamente como en la guía
      heroTitle: "Convierte Tu Documentación en un Experto IA Para Tu Web",
      heroSubtitle:
        "Sube tus archivos, define el rol de experto, y obtén un asistente especializado que se inserta en tu sitio. Sin programar, sin entrenar modelos.",
      heroDescription:
        "Desde hospitales que automatizan turnos hasta fintech que ofrece recomendaciones 24/7. BoyScout IA transforma tu conocimiento empresarial en asistentes inteligentes que trabajan mientras duermes.",
      heroCtaPrimary: "CREAR MI ASISTENTE GRATIS - 14 DÍAS",
      heroCtaSecondary: "Ver Demo en Vivo",
      noCardRequired: "No requiere tarjeta de crédito",

      // How It Works Section - Exactamente como en la guía
      howItWorksTitle: "De Documentos a Experto Web en 3 Pasos",
      step1Title: "📁 Sube Tu Documentación",
      step1Subtitle: "Carga PDFs, bases de datos, manuales",
      step1Description:
        "Precios, horarios, políticas, FAQ, catálogos de productos. Cualquier información que manejas en tu negocio se convierte en conocimiento del asistente.",
      step2Title: "🎭 Define El Rol del Experto",
      step2Subtitle: "Crea especialistas para tu industria",
      step2Description:
        '• "Asistente de Hospital" → Maneja turnos, especialidades, precios\n• "Asesor Financiero" → Analiza inversiones, recomienda portafolios\n• "Soporte E-commerce" → Conoce productos, envíos, devoluciones',
      step3Title: "🔗 Agrega a tu sitio",
      step3Subtitle: "Integración instantánea con código iframe",
      step3Description:
        "Recibes un script simple que pegas en tu web. Compatible con WordPress, Shopify, Wix, y cualquier plataforma. Funciona inmediatamente.",

      // Use Cases Section - Exactamente como en la guía
      useCasesTitle: "Asistentes IA Especializados Para Cada Industria",

      hospitalTitle: "🏥 HOSPITALES Y CLÍNICAS",
      hospitalSubtitle: "Tu Recepcionista Virtual 24/7",
      hospitalBefore: "Antes: 300+ llamadas diarias preguntando horarios y precios",
      hospitalAfter: "Después: Pacientes obtienen respuestas inmediatas sobre:",
      hospitalFeatures:
        "• Turnos disponibles por especialidad\n• Precios según obra social\n• Ubicación de consultorios\n• Preparación para estudios",
      hospitalResult: "Resultado: 75% menos llamadas al call center",

      fintechTitle: "💰 FINTECH Y ASESORES FINANCIEROS",
      fintechSubtitle: "Tu Asesor de Inversiones Siempre Disponible",
      fintechBefore: "Antes: Clientes consultan fuera de horario y pierdes oportunidades",
      fintechAfter: "Después: Asesoramiento especializado 24/7:",
      fintechFeatures:
        "• Análisis de acciones en tiempo real\n• Recomendaciones de portafolio personalizadas\n• Explicación de productos financieros complejos\n• Cálculos de riesgo y rendimiento",
      fintechResult: "Resultado: 3x más consultas convertidas en clientes",

      ecommerceTitle: "🛒 E-COMMERCE",
      ecommerceSubtitle: "Tu Vendedor Virtual Experto",
      ecommerceBefore: "Antes: Clientes abandonan el carrito por dudas sin resolver",
      ecommerceAfter: "Después: Soporte especializado que impulsa ventas:",
      ecommerceFeatures:
        "• Recomendaciones de productos personalizadas\n• Información detallada de compatibilidad\n• Consultas sobre envíos y devoluciones\n• Comparaciones técnicas entre productos",
      ecommerceResult: "Resultado: 40% más ventas en horarios no laborales",

      realEstateTitle: "🏢 INMOBILIARIAS",
      realEstateSubtitle: "Tu Agente Virtual de Propiedades",
      realEstateBefore: "Antes: Leads se pierden por falta de atención inmediata",
      realEstateAfter: "Después: Atención especializada en bienes raíces:",
      realEstateFeatures:
        "• Búsqueda de propiedades por presupuesto y zona\n• Cálculos de hipoteca y financiamiento\n• Programación automática de visitas\n• Comparación de características de inmuebles",
      realEstateResult: "Resultado: 60% más leads calificados",

      // Competitive Advantages - Exactamente como en la guía
      advantagesTitle: "¿Por Qué BoyScout IA vs. Otras Opciones?",
      vsGenericTitle: "VS. CHATBOTS GENÉRICOS",
      vsGenericBad: '❌ Otros chatbots: "No sé sobre tus horarios específicos"',
      vsGenericGood: '✅ BoyScout IA: "Hay turno con cardiología el martes a las 3PM"',
      vsGenericBad2: "❌ Otros chatbots: Respuestas genéricas de internet",
      vsGenericGood2: "✅ BoyScout IA: Conoce TUS precios, políticas y procedimientos",
      vsCustomTitle: "VS. DESARROLLO PERSONALIZADO",
      vsCustomBad: "❌ Desarrollo custom: Necesitas equipo técnico para mantenimiento",
      vsCustomGood: "✅ BoyScout IA: Actualizaciones automáticas, cero mantenimiento",

      // Technology Section - Exactamente como en la guía
      technologyTitle: "Tecnología de Vanguardia, Simplicidad de Uso",
      dualIntelligenceTitle: "🤖 Inteligencia Dual",
      dualIntelligenceDesc:
        "Elige DeepSeek, OpenAI, Grok como motor de IA para respuestas más precisas y contextualmente relevantes que cualquier modelo individual.",
      enterpriseSecurityTitle: "🔒 Seguridad Empresarial",
      enterpriseSecurityDesc:
        "Tus datos permanecen privados. Encriptación end-to-end, procesamiento seguro, cumplimiento con regulaciones de privacidad. Tu información nunca se comparte.",
      universalIntegrationTitle: "⚡ Integración Universal",
      universalIntegrationDesc:
        "Funciona con cualquier plataforma web. WordPress, Shopify, Wix, sitios custom. Si tiene web, BoyScout IA se integra.",
      smartAnalyticsTitle: "📊 Analytics Inteligentes",
      smartAnalyticsDesc:
        "Dashboard con métricas claras. Ve qué preguntan tus clientes, identifica oportunidades de mejora, mide el ROI real de tu asistente.",

      // Pricing Section - Exactamente como en la guía
      pricingTitle: "Precios Transparentes, ROI Inmediato",
      starterTitle: "STARTER",
      starterPrice: "$19.99/mes",
      starterSubtitle: "Perfecto para empezar",
      starterFeatures:
        "1 asistente especializado,Documentación hasta 100MB,Integración iframe simple,Soporte por email",

      professionalTitle: "PROFESSIONAL",
      professionalPrice: "$49.99/mes",
      professionalSubtitle: "Para empresas en crecimiento",
      professionalFeatures:
        "Hasta 3 asistentes especializados,Documentación hasta 500MB,Dashboard con analytics avanzados,Múltiples roles por asistente,Soporte prioritario",

      enterpriseTitle: "ENTERPRISE",
      enterprisePrice: "Precio personalizado",
      enterpriseSubtitle: "Para grandes operaciones",
      enterpriseFeatures:
        "Asistentes ilimitados,Integración API personalizada,White-label disponible,Soporte dedicado con SLA",

      startFreeTrial: "EMPEZAR PRUEBA GRATIS",

      // FAQ Section - Exactamente como en la guía (incluyendo la pregunta faltante)
      faqTitle: "Preguntas Frecuentes",
      faq1Q: "¿Qué tipo de documentación puedo subir?",
      faq1A:
        "PDFs, archivos Word, Excel, CSV, páginas web, manuales, FAQ. Cualquier información de tu negocio: precios, horarios, políticas, catálogos de productos.",
      faq2Q: "¿Necesito saber programar para usarlo?",
      faq2A:
        "No. Solo subes documentos, defines el rol del asistente, y obtienes un código para pegar en tu web. Sin programación necesaria.",
      faq3Q: "¿Se integra con mi página web actual?",
      faq3A:
        "Sí, funciona con WordPress, Shopify, Wix, sitios hechos a medida, y cualquier plataforma web mediante un simple iframe.",
      faq4Q: "¿Cuánto tiempo tarda en estar funcionando?",
      faq4A: "Desde que subes tu documentación hasta tener el asistente respondiendo en tu web: menos de 1 hora.",
      faq5Q: "¿Qué pasa si actualizo mi información?",
      faq5A:
        "Solo reemplazas los documentos en el panel. El asistente se actualiza automáticamente sin interrumpir el servicio.",
      faq6Q: "¿El asistente puede manejar múltiples idiomas?",
      faq6A: "Sí, responde en el idioma en que le pregunten. Perfecto para empresas con clientes internacionales.",
      faq7Q: "¿Hay límite en la complejidad de las respuestas?",
      faq7A:
        "No. Puede manejar desde consultas simples como horarios hasta análisis complejos como recomendaciones de inversión basadas en perfiles de riesgo.",

      // Final CTA Section - Exactamente como en la guía
      finalCtaTitle: "¿Listo Para Automatizar Tu Atención Al Cliente?",
      finalBenefits:
        "✅ Crea tu primer asistente en 10 minutos\n✅ Prueba gratis 14 días, sin tarjeta de crédito\n✅ Soporte personalizado incluido\n✅ Integración garantizada o te devolvemos tu dinero",
      finalCtaPrimary: "CREAR MI ASISTENTE GRATIS AHORA",
      seeDemo: "Ver Demo en Vivo",
      calculateRoi: "Calcular Mi ROI",
      talkToSpecialist: "Hablar con un Especialista",

      // Contact
      contactUs: "Contáctanos",
      getInTouch: "Ponte en Contacto",
      contactDescription:
        "¿Tienes preguntas o necesitas más información? Envíanos un mensaje y te responderemos pronto.",
      yourEmail: "Tu Email",
      emailPlaceholder: "Ingresa tu dirección de email",
      message: "Mensaje",
      messagePlaceholder: "¿Cómo podemos ayudarte?",
      send: "Enviar Mensaje",
      sending: "Enviando...",
      contactSuccessMessage: "¡Tu mensaje ha sido enviado con éxito! Te responderemos pronto.",
      contactErrorMessage: "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.",

      // Footer - Exactamente como en la guía
      footerDescription:
        "Fundada en 2025 por expertos en IA, ML y desarrollo de software. Comprometidos con democratizar la inteligencia artificial para empresas de todos los tamaños.",
      guarantees: "Garantías",
      guarantee1: "✅ Garantía de satisfacción 30 días",
      guarantee2: "✅ Uptime 99.9% garantizado",
      guarantee3: "✅ Soporte técnico incluido",
      guarantee4: "✅ Datos encriptados y seguros",
      support: "📧 Soporte: soporte@boyscout.dev",
      liveChat: "💬 Chat en vivo disponible",
      allRightsReserved: "Todos los derechos reservados.",
      terms: "Términos",
      privacy: "Privacidad",
      cookies: "Cookies",
    },
    en: {
      // Navigation
      navHowItWorks: "How It Works",
      navUseCases: "Use Cases",
      navTechnology: "Technology",
      navPricing: "Pricing",
      navContact: "Contact",
      signIn: "Sign In",
      tryDemo: "Try Demo",

      // Hero Section
      heroTitle: "Turn Your Documentation into an AI Expert for Your Website",
      heroSubtitle:
        "Upload your files, define the expert role, and get a specialized assistant that inserts on your site. No coding, no model training.",
      heroDescription:
        "From hospitals automating appointments to fintech offering 24/7 recommendations. BoyScout AI transforms your business knowledge into intelligent assistants that work while you sleep.",
      heroCtaPrimary: "CREATE MY FREE ASSISTANT - 14 DAYS",
      heroCtaSecondary: "See Live Demo",
      noCardRequired: "No credit card required",

      // How It Works Section
      howItWorksTitle: "From Documents to Web Expert in 3 Steps",
      step1Title: "📁 Upload Your Documentation",
      step1Subtitle: "Load PDFs, databases, manuals",
      step1Description:
        "Prices, schedules, policies, FAQs, product catalogs. Any information you handle in your business becomes assistant knowledge.",
      step2Title: "🎭 Define The Expert Role",
      step2Subtitle: "Create specialists for your industry",
      step2Description:
        '• "Hospital Assistant" → Manages appointments, specialties, prices\n• "Financial Advisor" → Analyzes investments, recommends portfolios\n• "E-commerce Support" → Knows products, shipping, returns',
      step3Title: "🔗 Embed on Your Website",
      step3Subtitle: "Instant integration with iframe code",
      step3Description:
        "You receive a simple script to paste on your website. Compatible with WordPress, Shopify, Wix, and any platform. Works immediately.",

      // Use Cases Section
      useCasesTitle: "Specialized AI Assistants for Every Industry",

      hospitalTitle: "🏥 HOSPITALS & CLINICS",
      hospitalSubtitle: "Your 24/7 Virtual Receptionist",
      hospitalBefore: "Before: 300+ daily calls asking about schedules and prices",
      hospitalAfter: "After: Patients get immediate answers about:",
      hospitalFeatures:
        "• Available appointments by specialty\n• Prices according to insurance\n• Office locations\n• Study preparation",
      hospitalResult: "Result: 75% fewer calls to call center",

      fintechTitle: "💰 FINTECH & FINANCIAL ADVISORS",
      fintechSubtitle: "Your Always Available Investment Advisor",
      fintechBefore: "Before: Clients inquire outside hours and you lose opportunities",
      fintechAfter: "After: Specialized 24/7 advisory:",
      fintechFeatures:
        "• Real-time stock analysis\n• Personalized portfolio recommendations\n• Complex financial product explanations\n• Risk and return calculations",
      fintechResult: "Result: 3x more inquiries converted to clients",

      ecommerceTitle: "🛒 E-COMMERCE",
      ecommerceSubtitle: "Your Expert Virtual Salesperson",
      ecommerceBefore: "Before: Customers abandon cart due to unresolved doubts",
      ecommerceAfter: "After: Specialized support that drives sales:",
      ecommerceFeatures:
        "• Personalized product recommendations\n• Detailed compatibility information\n• Shipping and return inquiries\n• Technical product comparisons",
      ecommerceResult: "Result: 40% more sales during non-business hours",

      realEstateTitle: "🏢 REAL ESTATE",
      realEstateSubtitle: "Your Virtual Property Agent",
      realEstateBefore: "Before: Leads are lost due to lack of immediate attention",
      realEstateAfter: "After: Specialized real estate attention:",
      realEstateFeatures:
        "• Property search by budget and area\n• Mortgage and financing calculations\n• Automatic visit scheduling\n• Property feature comparisons",
      realEstateResult: "Result: 60% more qualified leads",

      // Competitive Advantages
      advantagesTitle: "Why BoyScout AI vs. Other Options?",
      vsGenericTitle: "VS. GENERIC CHATBOTS",
      vsGenericBad: '❌ Other chatbots: "I don\'t know about your specific schedules"',
      vsGenericGood: '✅ BoyScout AI: "There\'s an appointment with cardiology Tuesday at 3PM"',
      vsGenericBad2: "❌ Other chatbots: Generic internet responses",
      vsGenericGood2: "✅ BoyScout AI: Knows YOUR prices, policies and procedures",
      vsCustomTitle: "VS. CUSTOM DEVELOPMENT",
      vsCustomBad: "❌ Custom development: Need technical team for maintenance",
      vsCustomGood: "✅ BoyScout AI: Automatic updates, zero maintenance",

      // Technology Section
      technologyTitle: "Cutting-Edge Technology, Simple to Use",
      dualIntelligenceTitle: "🤖 Dual Intelligence",
      dualIntelligenceDesc:
        "Choose DeepSeek, OpenAI, Grok as AI engine for more precise and contextually relevant responses than any individual model.",
      enterpriseSecurityTitle: "🔒 Enterprise Security",
      enterpriseSecurityDesc:
        "Your data stays private. End-to-end encryption, secure processing, privacy regulation compliance. Your information is never shared.",
      universalIntegrationTitle: "⚡ Universal Integration",
      universalIntegrationDesc:
        "Works with any web platform. WordPress, Shopify, Wix, custom sites. If it has a website, BoyScout AI integrates.",
      smartAnalyticsTitle: "📊 Smart Analytics",
      smartAnalyticsDesc:
        "Dashboard with clear metrics. See what your customers ask, identify improvement opportunities, measure real ROI of your assistant.",

      // Pricing Section
      pricingTitle: "Transparent Pricing, Immediate ROI",
      starterTitle: "STARTER",
      starterPrice: "$19.99/month",
      starterSubtitle: "Perfect to get started",
      starterFeatures: "1 specialized assistant,Documentation up to 100MB,Simple iframe integration,Email support",

      professionalTitle: "PROFESSIONAL",
      professionalPrice: "$49.99/month",
      professionalSubtitle: "For growing businesses",
      professionalFeatures:
        "Up to 3 specialized assistants,Documentation up to 500MB,Dashboard with advanced analytics,Multiple roles per assistant,Priority support",

      enterpriseTitle: "ENTERPRISE",
      enterprisePrice: "Custom pricing",
      enterpriseSubtitle: "For large operations",
      enterpriseFeatures:
        "Unlimited assistants,Custom API integration,White-label available,Dedicated support with SLA",

      startFreeTrial: "START FREE TRIAL",

      // FAQ Section
      faqTitle: "Frequently Asked Questions",
      faq1Q: "What type of documentation can I upload?",
      faq1A:
        "PDFs, Word files, Excel, CSV, web pages, manuals, FAQs. Any business information: prices, schedules, policies, product catalogs.",
      faq2Q: "Do I need to know how to code to use it?",
      faq2A:
        "No. Just upload documents, define the assistant role, and get code to paste on your website. No programming needed.",
      faq3Q: "Does it integrate with my current website?",
      faq3A: "Yes, works with WordPress, Shopify, Wix, custom sites, and any web platform through a simple iframe.",
      faq4Q: "How long does it take to be working?",
      faq4A: "From uploading your documentation to having the assistant responding on your website: less than 1 hour.",
      faq5Q: "What happens if I update my information?",
      faq5A:
        "Just replace the documents in the panel. The assistant updates automatically without interrupting service.",
      faq6Q: "Can the assistant handle multiple languages?",
      faq6A: "Yes, responds in the language they're asked in. Perfect for companies with international clients.",
      faq7Q: "Is there a limit to response complexity?",
      faq7A:
        "No. Can handle from simple queries like schedules to complex analysis like investment recommendations based on risk profiles.",

      // Final CTA Section
      finalCtaTitle: "Ready to Automate Your Customer Service?",
      finalBenefits:
        "✅ Create your first assistant in 10 minutes\n✅ Free 14-day trial, no credit card\n✅ Personalized support included\n✅ Integration guaranteed or money back",
      finalCtaPrimary: "CREATE MY FREE ASSISTANT NOW",
      seeDemo: "See Live Demo",
      calculateRoi: "Calculate My ROI",
      talkToSpecialist: "Talk to a Specialist",

      // Contact
      contactUs: "Contact Us",
      getInTouch: "Get in Touch",
      contactDescription: "Have questions or need more information? Send us a message and we'll get back to you soon.",
      yourEmail: "Your Email",
      emailPlaceholder: "Enter your email address",
      message: "Message",
      messagePlaceholder: "How can we help you?",
      send: "Send Message",
      sending: "Sending...",
      contactSuccessMessage: "Your message has been sent successfully! We'll get back to you soon.",
      contactErrorMessage: "There was an error sending your message. Please try again.",

      // Footer
      footerDescription:
        "Founded in 2025 by experts in AI, ML and software development. Committed to democratizing artificial intelligence for businesses of all sizes.",
      guarantees: "Guarantees",
      guarantee1: "✅ 30-day satisfaction guarantee",
      guarantee2: "✅ 99.9% uptime guaranteed",
      guarantee3: "✅ Technical support included",
      guarantee4: "✅ Encrypted and secure data",
      support: "📧 Support: soporte@boyscout.dev",
      liveChat: "💬 Live chat available",
      allRightsReserved: "All rights reserved.",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-purple-900">BoyScout IA</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#how-it-works" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navHowItWorks}
            </Link>
            <Link href="#use-cases" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navUseCases}
            </Link>
            <Link href="#technology" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navTechnology}
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navPricing}
            </Link>
            <Link href="#contact" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navContact}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <span className="text-sm font-medium text-slate-500 opacity-60 cursor-not-allowed hidden sm:inline-block">
              {t[language].signIn}
            </span>
            <Button className="bg-purple-600 hover:bg-purple-700 opacity-60 cursor-not-allowed" disabled={true}>
              {t[language].tryDemo}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">
                    Asistente IA Especializado
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-5xl xl:text-6xl/none">
                    {t[language].heroTitle}
                  </h1>
                  <p className="max-w-[600px] text-slate-600 md:text-xl">{t[language].heroSubtitle}</p>
                  <p className="max-w-[600px] text-slate-500 md:text-lg">{t[language].heroDescription}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 opacity-60 cursor-not-allowed"
                    disabled={true}
                  >
                    {t[language].heroCtaPrimary}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 opacity-60 cursor-not-allowed"
                    disabled={true}
                  >
                    <span className="flex items-center gap-1">
                      {t[language].heroCtaSecondary} <ChevronRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
                <p className="text-sm text-slate-500">{t[language].noCardRequired}</p>
              </div>
              <div className="relative lg:order-last">
                <Image
                  src="/images/ia-boyscout-hero.jpg"
                  width={600}
                  height={600}
                  alt="IA BoyScout - Tu Asistente Inteligente"
                  className="relative mx-auto aspect-square overflow-hidden rounded-3xl object-contain object-center shadow-xl bg-[#0a192f]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Proceso Simple
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].howItWorksTitle}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Upload className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].step1Title}</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">{t[language].step1Subtitle}</CardDescription>
                  <CardDescription className="text-slate-600">{t[language].step1Description}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Settings className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].step2Title}</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">{t[language].step2Subtitle}</CardDescription>
                  <CardDescription className="text-slate-600 whitespace-pre-line">
                    {t[language].step2Description}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <LinkIcon className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].step3Title}</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">{t[language].step3Subtitle}</CardDescription>
                  <CardDescription className="text-slate-600">{t[language].step3Description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Casos de Uso
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].useCasesTitle}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2">
              {/* Hospital Use Case */}
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Heart className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].hospitalTitle}</CardTitle>
                  <CardDescription className="text-lg font-medium text-purple-700">
                    {t[language].hospitalSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">{t[language].hospitalBefore}</p>
                    <p className="text-sm text-slate-600 font-medium">{t[language].hospitalAfter}</p>
                    <p className="text-sm text-slate-600 whitespace-pre-line">{t[language].hospitalFeatures}</p>
                    <p className="text-sm text-green-700 font-medium">{t[language].hospitalResult}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Fintech Use Case */}
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].fintechTitle}</CardTitle>
                  <CardDescription className="text-lg font-medium text-purple-700">
                    {t[language].fintechSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">{t[language].fintechBefore}</p>
                    <p className="text-sm text-slate-600 font-medium">{t[language].fintechAfter}</p>
                    <p className="text-sm text-slate-600 whitespace-pre-line">{t[language].fintechFeatures}</p>
                    <p className="text-sm text-green-700 font-medium">{t[language].fintechResult}</p>
                  </div>
                </CardContent>
              </Card>

              {/* E-commerce Use Case */}
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <ShoppingCart className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].ecommerceTitle}</CardTitle>
                  <CardDescription className="text-lg font-medium text-purple-700">
                    {t[language].ecommerceSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">{t[language].ecommerceBefore}</p>
                    <p className="text-sm text-slate-600 font-medium">{t[language].ecommerceAfter}</p>
                    <p className="text-sm text-slate-600 whitespace-pre-line">{t[language].ecommerceFeatures}</p>
                    <p className="text-sm text-green-700 font-medium">{t[language].ecommerceResult}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Real Estate Use Case */}
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Building className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].realEstateTitle}</CardTitle>
                  <CardDescription className="text-lg font-medium text-purple-700">
                    {t[language].realEstateSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">{t[language].realEstateBefore}</p>
                    <p className="text-sm text-slate-600 font-medium">{t[language].realEstateAfter}</p>
                    <p className="text-sm text-slate-600 whitespace-pre-line">{t[language].realEstateFeatures}</p>
                    <p className="text-sm text-green-700 font-medium">{t[language].realEstateResult}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Competitive Advantages Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Ventajas Competitivas
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].advantagesTitle}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900">{t[language].vsGenericTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{t[language].vsGenericBad}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{t[language].vsGenericGood}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{t[language].vsGenericBad2}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{t[language].vsGenericGood2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900">{t[language].vsCustomTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{t[language].vsCustomBad}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{t[language].vsCustomGood}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Tecnología
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].technologyTitle}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Bot className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900 text-lg">{t[language].dualIntelligenceTitle}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].dualIntelligenceDesc}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Shield className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900 text-lg">{t[language].enterpriseSecurityTitle}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].enterpriseSecurityDesc}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Zap className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900 text-lg">{t[language].universalIntegrationTitle}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].universalIntegrationDesc}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900 text-lg">{t[language].smartAnalyticsTitle}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].smartAnalyticsDesc}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Precios
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].pricingTitle}
                </h2>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
              {/* Starter Plan */}
              <Card className="border-purple-300 shadow-md bg-white">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-purple-900">{t[language].starterTitle}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-purple-700 mt-2">
                    {t[language].starterPrice}
                  </CardDescription>
                  <CardDescription className="text-slate-600">{t[language].starterSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {t[language].starterFeatures.split(",").map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => window.open("https://buy.stripe.com/test_14A8wP1XJ9eV1jR0ik7Zu00", "_blank")}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {t[language].startFreeTrial}
                  </Button>
                </CardFooter>
              </Card>

              {/* Professional Plan */}
              <Card className="border-purple-300 shadow-md bg-purple-50 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">Más Popular</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-purple-900">{t[language].professionalTitle}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-purple-700 mt-2">
                    {t[language].professionalPrice}
                  </CardDescription>
                  <CardDescription className="text-slate-600">{t[language].professionalSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {t[language].professionalFeatures.split(",").map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 opacity-60 cursor-not-allowed"
                    disabled={true}
                  >
                    {t[language].startFreeTrial}
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border-purple-300 shadow-md bg-white">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-purple-900">{t[language].enterpriseTitle}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-purple-700 mt-2">
                    {t[language].enterprisePrice}
                  </CardDescription>
                  <CardDescription className="text-slate-600">{t[language].enterpriseSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {t[language].enterpriseFeatures.split(",").map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 opacity-60 cursor-not-allowed"
                    disabled={true}
                  >
                    Contactar Ventas
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  FAQ
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].faqTitle}
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">{t[language].faq1Q}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].faq1A}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">{t[language].faq2Q}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].faq2A}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">{t[language].faq3Q}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].faq3A}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">{t[language].faq4Q}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].faq4A}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">{t[language].faq5Q}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].faq5A}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">{t[language].faq6Q}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].faq6A}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-purple-900 text-lg">{t[language].faq7Q}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].faq7A}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  {t[language].contactUs}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].getInTouch}
                </h2>
                <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed">{t[language].contactDescription}</p>
              </div>
            </div>
            <div className="mx-auto max-w-md space-y-6 bg-white p-6 rounded-xl shadow-sm border border-purple-100">
              <ContactForm
                translations={{
                  yourEmail: t[language].yourEmail,
                  emailPlaceholder: t[language].emailPlaceholder,
                  message: t[language].message,
                  messagePlaceholder: t[language].messagePlaceholder,
                  send: t[language].send,
                  sending: t[language].sending,
                  contactSuccessMessage: t[language].contactSuccessMessage,
                  contactErrorMessage: t[language].contactErrorMessage,
                }}
              />
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].finalCtaTitle}
                </h2>
                <div className="max-w-[600px] text-slate-600 whitespace-pre-line">{t[language].finalBenefits}</div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 opacity-60 cursor-not-allowed"
                  disabled={true}
                >
                  {t[language].finalCtaPrimary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 opacity-60 cursor-not-allowed"
                  disabled={true}
                >
                  {t[language].seeDemo}
                </Button>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 opacity-60 cursor-not-allowed"
                  disabled={true}
                >
                  {t[language].calculateRoi}
                </Button>
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 opacity-60 cursor-not-allowed"
                  disabled={true}
                >
                  {t[language].talkToSpecialist}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-purple-100 bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-bold text-purple-900">BoyScout IA</span>
              </div>
              <p className="text-sm text-slate-600">{t[language].footerDescription}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900">{t[language].guarantees}</h3>
              <div className="space-y-2">
                <p className="text-sm text-slate-600">{t[language].guarantee1}</p>
                <p className="text-sm text-slate-600">{t[language].guarantee2}</p>
                <p className="text-sm text-slate-600">{t[language].guarantee3}</p>
                <p className="text-sm text-slate-600">{t[language].guarantee4}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900">Contacto</h3>
              <div className="space-y-2">
                <p className="text-sm text-slate-600">{t[language].support}</p>
                <p className="text-sm text-slate-600">{t[language].liveChat}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-100 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} BoyScout IA. {t[language].allRightsReserved}
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm font-medium text-slate-700 hover:text-purple-600 hover:underline underline-offset-4"
              >
                {t[language].terms}
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-700 hover:text-purple-600 hover:underline underline-offset-4"
              >
                {t[language].privacy}
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-700 hover:text-purple-600 hover:underline underline-offset-4"
              >
                {t[language].cookies}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-slate-500 hover:text-purple-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-purple-600">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-purple-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
