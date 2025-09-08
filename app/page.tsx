"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Check,
  TrendingDown,
  Clock,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Zap,
  Shield,
  Cpu,
  Database,
} from "lucide-react"
import { useState, useRef, type FormEvent } from "react"
import { sendContactEmail } from "./actions"
import { ContactForm } from "@/components/contact-form"
import { decodeToken, type DecodedToken } from "@/lib/token-utils"
import Image from "next/image"

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
      navTalentSearch: "Búsqueda de Talento",
      navTraining: "Formación",
      navAnalytics: "Análisis",
      navProposals: "Propuestas",
      navContracts: "Contratos",
      navPricing: "Precios",
      navContact: "Contacto",
      requestDemo: "Solicitar Demo",

      // Hero Section
      heroTitle: "Impulsa tu consultora de outsourcing con IA",
      heroSubtitle:
        "Un agente inteligente que conecta talento, formación, análisis de mercado y contratos en un solo lugar",
      heroDescription:
        "Automatiza la gestión completa de tu consultora: desde la búsqueda de candidatos hasta la administración de contratos, todo potenciado por inteligencia artificial.",
      heroCtaPrimary: "Solicitar Demo",
      heroCtaSecondary: "Ver Funcionalidades",

      // Talent Search Section
      talentSearchTitle: "🔍 Búsqueda de Talento Inteligente",
      talentSearchSubtitle: "Encuentra a los mejores candidatos en minutos, no en semanas",
      talentSearchDescription:
        "Nuestro agente de IA analiza miles de perfiles, evalúa competencias técnicas y soft skills, y te presenta solo los candidatos que realmente encajan con tus requisitos.",
      talentSearchFeature1: "Filtrado automático por skills y experiencia",
      talentSearchFeature2: "Evaluación de compatibilidad cultural",
      talentSearchFeature3: "Ranking inteligente de candidatos",
      // Talent Search Detailed Section
      talentSearchBadge: "Búsqueda Inteligente",
      talentSearchDetailedDescription:
        "Nuestro agente de IA va más allá de los CVs tradicionales. Rastrea y analiza código real en GitHub, actividad técnica en Stack Overflow, contribuciones en comunidades de Dev.to, y perfiles profesionales a través de web scraping inteligente en múltiples plataformas.",

      // Multi-Platform Search
      multiPlatformTitle: "🔍 Búsqueda Multi-Plataforma Automatizada",
      githubAnalytics:
        "GitHub Analytics: Evalúa calidad de código, frecuencia de commits, tecnologías dominadas y contribuciones open source",
      webScrapingAdvanced:
        "Web Scraping Avanzado: Rastrea job boards, comunidades tech y plataformas profesionales con técnicas anti-detección",
      socialCodingPlatforms: "Social Coding Platforms: Monitorea GitLab, Bitbucket y otras plataformas de desarrollo",

      // Intelligent Filtering
      intelligentFilteringTitle: "🎯 Filtrado Inteligente Basado en Evidencia Real",
      skillsValidation: "Skills Validation: Verificación de habilidades basada en código real, no solo keywords en CV",
      experienceScoring: "Experience Scoring: Algoritmo que evalúa años de experiencia real vs. proyectos completados",
      techStackMatching:
        "Tech Stack Matching: Coincidencia exacta entre tecnologías del proyecto y expertise demostrable",
      activityPatterns: "Activity Patterns: Análisis de consistencia y evolución técnica del candidato",

      // Multi-Dimensional Ranking
      multiDimensionalRankingTitle: "📊 Ranking Inteligente Multi-Dimensional",
      technicalExcellenceScore:
        "Technical Excellence Score: Puntuación basada en calidad de código y contribuciones técnicas",
      marketDemandIndex: "Market Demand Index: Análisis de qué tan demandado está el perfil en el mercado actual",
      availabilityPrediction:
        "Availability Prediction: Algoritmo que predice disponibilidad basado en patrones de actividad",
      retentionProbability:
        "Retention Probability: Predicción de permanencia en el puesto basado en historial de actividad",

      // Competitive Advantages
      competitiveAdvantagesTitle: "⚡ Ventajas Competitivas",
      advantage1: "• 85% más rápido que métodos tradicionales de búsqueda",
      advantage2: "• Datos en tiempo real de múltiples fuentes técnicas",
      advantage3: "• Verificación automática de habilidades con evidencia tangible",
      advantage4: "• Reducción del 70% en falsos positivos de candidatos",
      advantage5: "• Acceso a desarrolladores pasivos que no buscan activamente trabajo",

      // Result
      resultTitle: "Resultado",
      resultDescription:
        "Candidatos pre-validados técnicamente con evidencia real de sus habilidades, listos para entrevistas técnicas directas.",

      // Technology Stack Section
      techStackBadge: "Tecnología de Vanguardia",
      techStackTitle: "🚀 Potenciado por las Mejores Tecnologías",
      techStackSubtitle: "Stack tecnológico de clase mundial para resultados excepcionales",
      techStackDescription:
        "Combinamos las tecnologías más avanzadas del mercado para ofrecerte una plataforma robusta, escalable y de alto rendimiento que supera las expectativas.",

      // AI & LLM
      aiLlmTitle: "🧠 Inteligencia Artificial Avanzada",
      openRouterDesc: "OpenRouter: Acceso optimizado a múltiples modelos de IA con balanceador de carga inteligente",
      openaiDesc: "OpenAI GPT-4: El modelo más avanzado para comprensión y generación de texto de alta calidad",
      mistralDesc: "Mistral AI: Modelos europeos de última generación para procesamiento multilingüe superior",
      deepseekDesc: "DeepSeek: IA especializada en análisis de código y evaluación técnica profunda",

      // Development & Infrastructure
      devInfraTitle: "⚙️ Desarrollo e Infraestructura",
      nextjsDesc: "Next.js: Framework React de producción con renderizado híbrido y optimizaciones automáticas",
      pythonDesc: "Python: Ecosistema robusto para machine learning, análisis de datos y automatización",
      supabaseDesc: "Supabase: Base de datos PostgreSQL en tiempo real con autenticación y APIs automáticas",

      // Performance Benefits
      performanceTitle: "📈 Beneficios de Rendimiento",
      benefit1: "• 99.9% de disponibilidad garantizada con infraestructura distribuida",
      benefit2: "• Respuestas en menos de 200ms gracias a optimizaciones avanzadas",
      benefit3: "• Escalabilidad automática para manejar miles de consultas simultáneas",
      benefit4: "• Seguridad enterprise con cifrado end-to-end y cumplimiento GDPR",

      // Training Section
      trainingTitle: "🎓 Recomendaciones de Formación Personalizadas",
      trainingSubtitle: "Identifica brechas de habilidades y ciérralas con formación dirigida",
      trainingDescription:
        "La IA detecta automáticamente las diferencias entre las habilidades actuales de tu equipo y las demandas del mercado, sugiriendo programas de formación específicos.",
      trainingFeature1: "Análisis de gaps de habilidades",
      trainingFeature2: "Recomendaciones de cursos personalizados",
      trainingFeature3: "Seguimiento de progreso automatizado",

      // Churn Prediction Section
      churnTitle: "📉 Predicción de Rotación de Personal",
      churnSubtitle: "Anticipa la salida de empleados clave y actúa a tiempo",
      churnDescription:
        "Algoritmos predictivos analizan patrones de comportamiento, satisfacción y engagement para alertarte sobre posibles renuncias antes de que ocurran.",
      churnFeature1: "Alertas tempranas de riesgo de salida",
      churnFeature2: "Análisis de factores de retención",
      churnFeature3: "Estrategias personalizadas de retención",

      // Market Analysis Section
      marketTitle: "📊 Análisis de Mercado en Tiempo Real",
      marketSubtitle: "Mantente adelante con insights del mercado laboral",
      marketDescription:
        "Monitorea tendencias salariales, demanda de perfiles y competencia en tu sector para tomar decisiones estratégicas basadas en datos.",
      marketFeature1: "Tendencias salariales por rol y región",
      marketFeature2: "Demanda de perfiles emergentes",
      marketFeature3: "Análisis competitivo del mercado",

      // Proposals Section
      proposalsTitle: "📝 Generación Automática de Propuestas",
      proposalsSubtitle: "Crea propuestas ganadoras en minutos, no en horas",
      proposalsDescription:
        "La IA genera propuestas comerciales personalizadas basadas en el perfil del cliente, historial de proyectos y mejores prácticas del sector.",
      proposalsFeature1: "Templates inteligentes por industria",
      proposalsFeature2: "Pricing automático basado en mercado",
      proposalsFeature3: "Personalización según cliente objetivo",

      // Contracts Section
      contractsTitle: "📑 Gestión Inteligente de Contratos",
      contractsSubtitle: "Automatiza el ciclo completo de administración contractual",
      contractsDescription:
        "Desde la creación hasta el seguimiento de cumplimiento, gestiona todos tus contratos con alertas automáticas y control de vencimientos.",
      contractsFeature1: "Alertas de vencimientos y renovaciones",
      contractsFeature2: "Seguimiento de cumplimiento automático",
      contractsFeature3: "Dashboard de estado de contratos",

      // Pricing Section
      pricingTitle: "Planes Transparentes, ROI Inmediato",
      starterTitle: "STARTER",
      starterPrice: "$299/mes",
      starterSubtitle: "Perfecto para consultoras pequeñas",
      starterFeatures: "Hasta 50 perfiles gestionados,Búsqueda IA básica,Dashboard de contratos,Soporte por email",

      professionalTitle: "PROFESSIONAL",
      professionalPrice: "$599/mes",
      professionalSubtitle: "Para consultoras en crecimiento",
      professionalFeatures:
        "Hasta 200 perfiles gestionados,IA avanzada + predicción de rotación,Analytics de mercado completos,Generación automática de propuestas,Soporte prioritario",

      enterpriseTitle: "ENTERPRISE",
      enterprisePrice: "Precio personalizado",
      enterpriseSubtitle: "Para grandes operaciones",
      enterpriseFeatures:
        "Perfiles ilimitados,API personalizada,White-label disponible,Integración con sistemas existentes,Soporte dedicado con SLA",

      startFreeTrial: "EMPEZAR PRUEBA GRATIS",

      // Final CTA Section
      finalCtaTitle: "Transforma tu consultora de outsourcing con IA hoy mismo",
      finalCtaSubtitle: "Únete a las consultoras que ya están revolucionando su gestión con inteligencia artificial",
      finalCtaPrimary: "Hablar con un asesor",
      finalCtaSecondary: "Probar gratis",

      // Contact
      contactUs: "Contáctanos",
      getInTouch: "Solicita tu Demo Personalizada",
      contactDescription:
        "¿Listo para revolucionar tu consultora? Agenda una demo personalizada y descubre cómo la IA puede transformar tu negocio.",
      yourEmail: "Tu Email",
      emailPlaceholder: "Ingresa tu dirección de email",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos sobre tu consultora y necesidades específicas",
      send: "Solicitar Demo",
      sending: "Enviando...",
      contactSuccessMessage: "¡Tu solicitud ha sido enviada! Te contactaremos pronto para agendar tu demo.",
      contactErrorMessage: "Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.",

      // Footer
      footerDescription:
        "Especialistas en soluciones de IA para consultoras de outsourcing. Transformamos la gestión de talento con tecnología de vanguardia.",
      allRightsReserved: "Todos los derechos reservados.",
      terms: "Términos",
      privacy: "Privacidad",
      cookies: "Cookies",
      // Footer sections
      functionalitiesTitle: "Funcionalidades",
      talentSearchLink: "Búsqueda de Talento",
      trainingLink: "Formación IA",
      marketAnalysisLink: "Análisis de Mercado",
      contractManagementLink: "Gestión de Contratos",
      contactTitle: "Contacto",
      supportEmail: "📧 soporte@boyscout.dev",
      liveChatAvailable: "💬 Chat en vivo disponible",
      // Video Section
      videoSectionBadge: "Demo en Vivo",
      videoSectionTitle: "Ve a BoyScout AI en Acción",
      videoSectionDescription:
        "Descubre cómo nuestra plataforma revoluciona la gestión de consultoras de outsourcing. Una pequeña prueba de forma local.",
      videoSectionCta: "Solicitar Demo Personalizada",
    },
    en: {
      // Navigation
      navTalentSearch: "Talent Search",
      navTraining: "Training",
      navAnalytics: "Analytics",
      navProposals: "Proposals",
      navContracts: "Contracts",
      navPricing: "Pricing",
      navContact: "Contact",
      requestDemo: "Request Demo",

      // Hero Section
      heroTitle: "Boost your outsourcing consultancy with AI",
      heroSubtitle: "An intelligent agent that connects talent, training, market analysis and contracts in one place",
      heroDescription:
        "Automate your consultancy's complete management: from candidate search to contract administration, all powered by artificial intelligence.",
      heroCtaPrimary: "Request Demo",
      heroCtaSecondary: "See Features",

      // Talent Search Section
      talentSearchTitle: "🔍 Intelligent Talent Search",
      talentSearchSubtitle: "Find the best candidates in minutes, not weeks",
      talentSearchDescription:
        "Our AI agent analyzes thousands of profiles, evaluates technical and soft skills, and presents only candidates that truly fit your requirements.",
      talentSearchFeature1: "Automatic filtering by skills and experience",
      talentSearchFeature2: "Cultural compatibility assessment",
      talentSearchFeature3: "Intelligent candidate ranking",
      // Talent Search Detailed Section
      talentSearchBadge: "Intelligent Search",
      talentSearchDetailedDescription:
        "Our AI agent goes beyond traditional CVs. It tracks and analyzes real code on GitHub, technical activity on Stack Overflow, contributions in Dev.to communities, and professional profiles through intelligent web scraping across multiple platforms.",

      // Multi-Platform Search
      multiPlatformTitle: "🔍 Automated Multi-Platform Search",
      githubAnalytics:
        "GitHub Analytics: Evaluates code quality, commit frequency, mastered technologies and open source contributions",
      webScrapingAdvanced:
        "Advanced Web Scraping: Tracks job boards, tech communities and professional platforms with anti-detection techniques",
      socialCodingPlatforms: "Social Coding Platforms: Monitors GitLab, Bitbucket and other development platforms",

      // Intelligent Filtering
      intelligentFilteringTitle: "🎯 Intelligent Filtering Based on Real Evidence",
      skillsValidation: "Skills Validation: Skill verification based on real code, not just CV keywords",
      experienceScoring: "Experience Scoring: Algorithm that evaluates real years of experience vs. completed projects",
      techStackMatching: "Tech Stack Matching: Exact match between project technologies and demonstrable expertise",
      activityPatterns: "Activity Patterns: Analysis of consistency and technical evolution of the candidate",

      // Multi-Dimensional Ranking
      multiDimensionalRankingTitle: "📊 Multi-Dimensional Intelligent Ranking",
      technicalExcellenceScore: "Technical Excellence Score: Score based on code quality and technical contributions",
      marketDemandIndex: "Market Demand Index: Analysis of how in-demand the profile is in the current market",
      availabilityPrediction:
        "Availability Prediction: Algorithm that predicts availability based on activity patterns",
      retentionProbability: "Retention Probability: Prediction of job permanence based on activity history",

      // Competitive Advantages
      competitiveAdvantagesTitle: "⚡ Competitive Advantages",
      advantage1: "• 85% faster than traditional search methods",
      advantage2: "• Real-time data from multiple technical sources",
      advantage3: "• Automatic skill verification with tangible evidence",
      advantage4: "• 70% reduction in candidate false positives",
      advantage5: "• Access to passive developers not actively job searching",

      // Result
      resultTitle: "Result",
      resultDescription:
        "Technically pre-validated candidates with real evidence of their skills, ready for direct technical interviews.",

      // Technology Stack Section
      techStackBadge: "Cutting-Edge Technology",
      techStackTitle: "🚀 Powered by the Best Technologies",
      techStackSubtitle: "World-class technology stack for exceptional results",
      techStackDescription:
        "We combine the most advanced technologies in the market to offer you a robust, scalable, and high-performance platform that exceeds expectations.",

      // AI & LLM
      aiLlmTitle: "🧠 Advanced Artificial Intelligence",
      openRouterDesc: "OpenRouter: Optimized access to multiple AI models with intelligent load balancing",
      openaiDesc: "OpenAI GPT-4: The most advanced model for high-quality text understanding and generation",
      mistralDesc: "Mistral AI: European cutting-edge models for superior multilingual processing",
      deepseekDesc: "DeepSeek: AI specialized in code analysis and deep technical evaluation",

      // Development & Infrastructure
      devInfraTitle: "⚙️ Development & Infrastructure",
      nextjsDesc: "Next.js: Production React framework with hybrid rendering and automatic optimizations",
      pythonDesc: "Python: Robust ecosystem for machine learning, data analysis and automation",
      supabaseDesc: "Supabase: Real-time PostgreSQL database with authentication and automatic APIs",

      // Performance Benefits
      performanceTitle: "📈 Performance Benefits",
      benefit1: "• 99.9% guaranteed uptime with distributed infrastructure",
      benefit2: "• Sub-200ms responses thanks to advanced optimizations",
      benefit3: "• Automatic scaling to handle thousands of simultaneous queries",
      benefit4: "• Enterprise security with end-to-end encryption and GDPR compliance",

      // Training Section
      trainingTitle: "🎓 Personalized Training Recommendations",
      trainingSubtitle: "Identify skill gaps and close them with targeted training",
      trainingDescription:
        "AI automatically detects differences between your team's current skills and market demands, suggesting specific training programs.",
      trainingFeature1: "Skills gap analysis",
      trainingFeature2: "Personalized course recommendations",
      trainingFeature3: "Automated progress tracking",

      // Churn Prediction Section
      churnTitle: "📉 Staff Turnover Prediction",
      churnSubtitle: "Anticipate key employee departures and act in time",
      churnDescription:
        "Predictive algorithms analyze behavior patterns, satisfaction and engagement to alert you about possible resignations before they happen.",
      churnFeature1: "Early departure risk alerts",
      churnFeature2: "Retention factor analysis",
      churnFeature3: "Personalized retention strategies",

      // Market Analysis Section
      marketTitle: "📊 Real-Time Market Analysis",
      marketSubtitle: "Stay ahead with labor market insights",
      marketDescription:
        "Monitor salary trends, profile demand and competition in your sector to make data-driven strategic decisions.",
      marketFeature1: "Salary trends by role and region",
      marketFeature2: "Emerging profile demand",
      marketFeature3: "Competitive market analysis",

      // Proposals Section
      proposalsTitle: "📝 Automatic Proposal Generation",
      proposalsSubtitle: "Create winning proposals in minutes, not hours",
      proposalsDescription:
        "AI generates personalized commercial proposals based on client profile, project history and industry best practices.",
      proposalsFeature1: "Smart templates by industry",
      proposalsFeature2: "Automatic market-based pricing",
      proposalsFeature3: "Target client customization",

      // Contracts Section
      contractsTitle: "📑 Intelligent Contract Management",
      contractsSubtitle: "Automate the complete contractual administration cycle",
      contractsDescription:
        "From creation to compliance tracking, manage all your contracts with automatic alerts and expiration control.",
      contractsFeature1: "Expiration and renewal alerts",
      contractsFeature2: "Automatic compliance tracking",
      contractsFeature3: "Contract status dashboard",

      // Pricing Section
      pricingTitle: "Transparent Plans, Immediate ROI",
      starterTitle: "STARTER",
      starterPrice: "$299/month",
      starterSubtitle: "Perfect for small consultancies",
      starterFeatures: "Up to 50 managed profiles,Basic AI search,Contract dashboard,Email support",

      professionalTitle: "PROFESSIONAL",
      professionalPrice: "$599/month",
      professionalSubtitle: "For growing consultancies",
      professionalFeatures:
        "Up to 200 managed profiles,Advanced AI + churn prediction,Complete market analytics,Automatic proposal generation,Priority support",

      enterpriseTitle: "ENTERPRISE",
      enterprisePrice: "Custom pricing",
      enterpriseSubtitle: "For large operations",
      enterpriseFeatures:
        "Unlimited profiles,Custom API,White-label available,Integration with existing systems,Dedicated support with SLA",

      startFreeTrial: "START FREE TRIAL",

      // Final CTA Section
      finalCtaTitle: "Transform your outsourcing consultancy with AI today",
      finalCtaSubtitle:
        "Join consultancies that are already revolutionizing their management with artificial intelligence",
      finalCtaPrimary: "Talk to an advisor",
      finalCtaSecondary: "Try for free",

      // Contact
      contactUs: "Contact Us",
      getInTouch: "Request your Personalized Demo",
      contactDescription:
        "Ready to revolutionize your consultancy? Schedule a personalized demo and discover how AI can transform your business.",
      yourEmail: "Your Email",
      emailPlaceholder: "Enter your email address",
      message: "Message",
      messagePlaceholder: "Tell us about your consultancy and specific needs",
      send: "Request Demo",
      sending: "Sending...",
      contactSuccessMessage: "Your request has been sent! We'll contact you soon to schedule your demo.",
      contactErrorMessage: "There was an error sending your request. Please try again.",

      // Footer
      footerDescription:
        "Specialists in AI solutions for outsourcing consultancies. We transform talent management with cutting-edge technology.",
      allRightsReserved: "All rights reserved.",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
      // Footer sections
      functionalitiesTitle: "Features",
      talentSearchLink: "Talent Search",
      trainingLink: "AI Training",
      marketAnalysisLink: "Market Analysis",
      contractManagementLink: "Contract Management",
      contactTitle: "Contact",
      supportEmail: "📧 support@boyscout.dev",
      liveChatAvailable: "💬 Live chat available",
      // Video Section
      videoSectionBadge: "Live Demo",
      videoSectionTitle: "See BoyScout AI in Action",
      videoSectionDescription:
        "Discover how our platform revolutionizes outsourcing consultancy management. A small local test.",
      videoSectionCta: "Request Personalized Demo",
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/outsourcing-ai-logo.png"
              alt="OutsourcingAI Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-purple-900">OutsourcingAI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#talent-search" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navTalentSearch}
            </Link>
            <Link href="#training" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navTraining}
            </Link>
            <Link href="#analytics" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navAnalytics}
            </Link>
            <Link href="#proposals" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navProposals}
            </Link>
            <Link href="#contracts" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navContracts}
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
            <Button className="bg-purple-600 hover:bg-purple-700">{t[language].requestDemo}</Button>
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
                    Consultora IA Potenciada
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-5xl xl:text-6xl/none">
                    {t[language].heroTitle}
                  </h1>
                  <p className="max-w-[600px] text-slate-600 md:text-xl">{t[language].heroSubtitle}</p>
                  <p className="max-w-[600px] text-slate-500 md:text-lg">{t[language].heroDescription}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    {t[language].heroCtaPrimary}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                  >
                    <span className="flex items-center gap-1">
                      {t[language].heroCtaSecondary} <ChevronRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>
              <div className="relative lg:order-last">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bjei1srgnrNnUKw5n7Be4mZw9aZRfJ.png"
                  width={600}
                  height={600}
                  alt="OutsourcingAI - Tu Asistente Inteligente para Consultoras"
                  className="relative mx-auto aspect-square overflow-hidden rounded-3xl object-contain object-center shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Talent Search Section */}
        <section id="talent-search" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="border-purple-200 text-purple-700 mb-4">
                  {t[language].talentSearchBadge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl mb-6">
                  {t[language].talentSearchTitle}
                </h2>
              </div>

              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">{t[language].talentSearchSubtitle}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {t[language].talentSearchDetailedDescription}
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="border-purple-100 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                        {t[language].multiPlatformTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <p className="text-sm">{t[language].githubAnalytics}</p>
                        <p className="text-sm">{t[language].webScrapingAdvanced}</p>
                        <p className="text-sm">{t[language].socialCodingPlatforms}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-100 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                        {t[language].intelligentFilteringTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <p className="text-sm">{t[language].skillsValidation}</p>
                        <p className="text-sm">{t[language].experienceScoring}</p>
                        <p className="text-sm">{t[language].techStackMatching}</p>
                        <p className="text-sm">{t[language].activityPatterns}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-100 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                        {t[language].multiDimensionalRankingTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <p className="text-sm">{t[language].technicalExcellenceScore}</p>
                        <p className="text-sm">{t[language].marketDemandIndex}</p>
                        <p className="text-sm">{t[language].availabilityPrediction}</p>
                        <p className="text-sm">{t[language].retentionProbability}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-100 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                        {t[language].competitiveAdvantagesTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <p className="text-sm">{t[language].advantage1}</p>
                        <p className="text-sm">{t[language].advantage2}</p>
                        <p className="text-sm">{t[language].advantage3}</p>
                        <p className="text-sm">{t[language].advantage4}</p>
                        <p className="text-sm">{t[language].advantage5}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <Card className="border-purple-200 bg-purple-50 shadow-sm max-w-3xl mx-auto">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-2xl">💡</span>
                        <h4 className="text-lg font-semibold text-purple-900">{t[language].resultTitle}</h4>
                      </div>
                      <p className="text-purple-800 font-medium">{t[language].resultDescription}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  {t[language].videoSectionBadge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].videoSectionTitle}
                </h2>
                <p className="max-w-[600px] text-slate-600 md:text-xl">{t[language].videoSectionDescription}</p>
              </div>

              <div className="w-full max-w-4xl">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-purple-100">
                  <iframe
                    src="https://www.youtube.com/embed/uiFGVo02Ewk"
                    title="BoyScout AI Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  {t[language].videoSectionCta}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="border-purple-200 text-purple-700 mb-4">
                  {t[language].techStackBadge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl mb-6">
                  {t[language].techStackTitle}
                </h2>
                <p className="text-xl text-slate-600 mb-4">{t[language].techStackSubtitle}</p>
                <p className="text-slate-600 max-w-3xl mx-auto">{t[language].techStackDescription}</p>
              </div>

              <div className="space-y-12">
                {/* AI & LLM Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900">{t[language].aiLlmTitle}</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100">
                            <Zap className="h-5 w-5 text-green-600" />
                          </div>
                          <CardTitle className="text-lg text-purple-900">OpenRouter</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{t[language].openRouterDesc}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <Cpu className="h-5 w-5 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg text-purple-900">OpenAI GPT-4</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{t[language].openaiDesc}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-orange-100">
                            <Shield className="h-5 w-5 text-orange-600" />
                          </div>
                          <CardTitle className="text-lg text-purple-900">Mistral AI</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{t[language].mistralDesc}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-100">
                            <Cpu className="h-5 w-5 text-purple-600" />
                          </div>
                          <CardTitle className="text-lg text-purple-900">DeepSeek</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{t[language].deepseekDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Development & Infrastructure Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900">{t[language].devInfraTitle}</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-black">
                            <span className="text-white font-bold text-sm">▲</span>
                          </div>
                          <CardTitle className="text-lg text-purple-900">Next.js</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{t[language].nextjsDesc}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-yellow-100">
                            <span className="text-yellow-600 font-bold text-sm">🐍</span>
                          </div>
                          <CardTitle className="text-lg text-purple-900">Python</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{t[language].pythonDesc}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100">
                            <Database className="h-5 w-5 text-green-600" />
                          </div>
                          <CardTitle className="text-lg text-purple-900">Supabase</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{t[language].supabaseDesc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Performance Benefits */}
                <div className="text-center">
                  <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg max-w-4xl mx-auto">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-3xl">📈</span>
                        <h4 className="text-2xl font-bold text-purple-900">{t[language].performanceTitle}</h4>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 text-left">
                        <p className="text-sm text-slate-700 flex items-start gap-2">
                          <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {t[language].benefit1}
                        </p>
                        <p className="text-sm text-slate-700 flex items-start gap-2">
                          <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {t[language].benefit2}
                        </p>
                        <p className="text-sm text-slate-700 flex items-start gap-2">
                          <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {t[language].benefit3}
                        </p>
                        <p className="text-sm text-slate-700 flex items-start gap-2">
                          <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {t[language].benefit4}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Section */}
        <section id="training" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Card className="border-purple-100 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Análisis de Skills - Equipo Frontend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>React</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>TypeScript</span>
                          <span>60%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <div className="text-xs text-purple-600 mt-1">📚 Curso recomendado: TypeScript Avanzado</div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Next.js</span>
                          <span>40%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                        <div className="text-xs text-purple-600 mt-1">📚 Curso recomendado: Next.js Fundamentals</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Formación Inteligente
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].trainingTitle}
                </h2>
                <p className="text-xl text-slate-600">{t[language].trainingSubtitle}</p>
                <p className="text-slate-600">{t[language].trainingDescription}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].trainingFeature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].trainingFeature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].trainingFeature3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Churn Prediction Section */}
        <section id="churn" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Predicción Avanzada
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].churnTitle}
                </h2>
                <p className="text-xl text-slate-600">{t[language].churnSubtitle}</p>
                <p className="text-slate-600">{t[language].churnDescription}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].churnFeature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].churnFeature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].churnFeature3}</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <Card className="border-purple-100 bg-white shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Riesgo de Rotación - Equipo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-500"></div>
                          <span className="font-medium">María Rodríguez</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Bajo Riesgo</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-yellow-500"></div>
                          <span className="font-medium">Pedro Martín</span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Riesgo Medio</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-red-500"></div>
                          <span className="font-medium">Luis Fernández</span>
                        </div>
                        <Badge className="bg-red-100 text-red-800">Alto Riesgo</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Market Analysis Section */}
        <section id="analytics" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Card className="border-purple-100 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Demanda de Perfiles - Q1 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cloud Engineer</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">IA/ML Engineer</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">DevOps</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Frontend</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Inteligencia de Mercado
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].marketTitle}
                </h2>
                <p className="text-xl text-slate-600">{t[language].marketSubtitle}</p>
                <p className="text-slate-600">{t[language].marketDescription}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].marketFeature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].marketFeature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].marketFeature3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proposals Section */}
        <section id="proposals" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Propuestas Inteligentes
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].proposalsTitle}
                </h2>
                <p className="text-xl text-slate-600">{t[language].proposalsSubtitle}</p>
                <p className="text-slate-600">{t[language].proposalsDescription}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].proposalsFeature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].proposalsFeature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].proposalsFeature3}</span>
                  </div>
                </div>
              </div>
              <div>
                <Card className="border-purple-100 bg-white shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Propuesta Comercial</CardTitle>
                      <Badge className="bg-green-100 text-green-800">Generada</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Cliente: TechCorp S.A.</h4>
                        <p className="text-xs text-slate-600 mb-3">Desarrollo de equipo DevOps - 6 meses</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-slate-500">Perfiles:</span>
                            <p className="font-medium">3 DevOps Engineers</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Inversión:</span>
                            <p className="font-medium">$45,000/mes</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-purple-600">
                        <Clock className="h-4 w-4" />
                        <span>Generada en 2 minutos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contracts Section */}
        <section id="contracts" className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Card className="border-purple-100 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Dashboard de Contratos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">Contrato TechCorp</p>
                          <p className="text-xs text-slate-500">Vence: 15 Mar 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-xs">Activo</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                        <div>
                          <p className="font-medium text-sm">Contrato InnovateLab</p>
                          <p className="text-xs text-slate-500">Vence: 28 Feb 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs">Por renovar</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">Contrato StartupXYZ</p>
                          <p className="text-xs text-slate-500">Vence: 10 Jun 2024</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-xs">Activo</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Gestión Automatizada
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].contractsTitle}
                </h2>
                <p className="text-xl text-slate-600">{t[language].contractsSubtitle}</p>
                <p className="text-slate-600">{t[language].contractsDescription}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].contractsFeature1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].contractsFeature2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-600">{t[language].contractsFeature3}</span>
                  </div>
                </div>
              </div>
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
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">{t[language].startFreeTrial}</Button>
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
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">{t[language].startFreeTrial}</Button>
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
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Contactar Ventas
                  </Button>
                </CardFooter>
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
                <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed">{t[language].finalCtaSubtitle}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  {t[language].finalCtaPrimary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  {t[language].finalCtaSecondary}
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
                <Image
                  src="/images/outsourcing-ai-logo.png"
                  alt="OutsourcingAI Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="text-lg font-bold text-purple-900">OutsourcingAI</span>
              </div>
              <p className="text-sm text-slate-600">{t[language].footerDescription}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900">{t[language].functionalitiesTitle}</h3>
              <div className="space-y-2">
                <Link href="#talent-search" className="block text-sm text-slate-600 hover:text-purple-600">
                  {t[language].talentSearchLink}
                </Link>
                <Link href="#training" className="block text-sm text-slate-600 hover:text-purple-600">
                  {t[language].trainingLink}
                </Link>
                <Link href="#analytics" className="block text-sm text-slate-600 hover:text-purple-600">
                  {t[language].marketAnalysisLink}
                </Link>
                <Link href="#contracts" className="block text-sm text-slate-600 hover:text-purple-600">
                  {t[language].contractManagementLink}
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-900">{t[language].contactTitle}</h3>
              <div className="space-y-2">
                <p className="text-sm text-slate-600">{t[language].supportEmail}</p>
                <p className="text-sm text-slate-600">{t[language].liveChatAvailable}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-100 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} OutsourcingAI. {t[language].allRightsReserved}
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
