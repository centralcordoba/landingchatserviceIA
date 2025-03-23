"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Brain,
  Code,
  MessageSquare,
  Shield,
  Zap,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  User,
  Users,
  Globe,
} from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [language, setLanguage] = useState("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  const t = {
    en: {
      navFeatures: "Features",
      navTechnology: "Technology",
      navAbout: "About",
      navBlog: "Blog",
      signIn: "Sign In",
      tryDemo: "Try Demo",
      heroTitle: "Your Intelligent Assistant, Always Ready to Help",
      heroDescription:
        "Boyscout IA combines cutting-edge LLMs from DeepSeek and OpenAI to deliver intelligent, context-aware assistance for all your needs.",
      tryForFree: "Try For Free",
      learnMore: "Learn More",
      features: "Features",
      intelligentAssistance: "Intelligent Assistance, Powered by AI",
      featuresDescription:
        "Boyscout IA leverages advanced language models to provide smart, contextual assistance across various domains.",
      naturalConversations: "Natural Conversations",
      naturalConversationsDesc: "Engage in fluid, human-like conversations with contextual understanding and memory.",
      multiModelIntelligence: "Multi-Model Intelligence",
      multiModelIntelligenceDesc:
        "Combines DeepSeek and OpenAI models for enhanced reasoning and problem-solving capabilities.",
      codeAssistance: "Code Assistance",
      codeAssistanceDesc:
        "Get help with programming tasks, debugging, and technical documentation across multiple languages.",
      enterpriseSecurity: "Enterprise-Grade Security",
      enterpriseSecurityDesc:
        "Your data stays private with end-to-end encryption, secure processing, and compliance with industry standards.",
      technology: "Technology",
      cuttingEdgeTech: "Built with Cutting-Edge Tech",
      techDescription:
        "Boyscout IA combines the best technologies to deliver a powerful, reliable AI assistant experience.",
      deepSeekDesc: "Advanced language models for complex reasoning and specialized knowledge.",
      openAIDesc: "State-of-the-art language processing for natural conversations and content generation.",
      pythonDesc: "Robust backend infrastructure with powerful data processing and AI capabilities.",
      angularDesc: "Responsive, dynamic frontend for seamless user interactions and experiences.",
      reactDesc:
        "Component-based library for building interactive user interfaces with a virtual DOM for optimal performance.",
      nextjsDesc:
        "React framework that enables server-side rendering and static site generation for improved performance and SEO.",
      interactiveDemo: "Interactive Demo",
      experienceBoyscout: "Experience Boyscout IA in Action",
      demoDescription:
        "Try our interactive demo to see how Boyscout IA can assist with your questions, tasks, and challenges.",
      demoFeature1: "Ask complex questions and get detailed answers",
      demoFeature2: "Get help with coding and technical problems",
      demoFeature3: "Generate creative content and ideas",
      demoFeature4: "Analyze data and provide insights",
      startChatting: "Start Chatting Now",
      aboutUs: "About Us",
      innovatingAI: "Innovating AI Assistance from New York",
      aboutDescription:
        "Based in the heart of New York City, our team of AI researchers, engineers, and designers are dedicated to creating the most helpful AI assistant for businesses and individuals.",
      foundedIn:
        "Founded in 2023, Boyscout IA brings together expertise in machine learning, natural language processing, and software development to push the boundaries of what AI assistants can do.",
      founders: "Our Founders",
      meetOurTeam: "Meet Our Team",
      readyToExperience: "Ready to Experience Smarter Assistance?",
      joinUsers: "Join thousands of users already benefiting from Boyscout IA's intelligent assistance.",
      startFreeTrial: "Start Free Trial",
      scheduleDemo: "Schedule a Demo",
      noCardRequired: "No credit card required. 14-day free trial.",
      allRightsReserved: "All rights reserved.",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
    },
    es: {
      navFeatures: "Características",
      navTechnology: "Tecnología",
      navAbout: "Acerca de",
      navBlog: "Blog",
      signIn: "Iniciar Sesión",
      tryDemo: "Probar Demo",
      heroTitle: "Tu Asistente Inteligente, Siempre Listo para Ayudar",
      heroDescription:
        "Boyscout IA combina los LLMs más avanzados de DeepSeek y OpenAI para ofrecer asistencia inteligente y contextual para todas tus necesidades.",
      tryForFree: "Prueba Gratis",
      learnMore: "Más Información",
      features: "Características",
      intelligentAssistance: "Asistencia Inteligente, Impulsada por IA",
      featuresDescription:
        "Boyscout IA utiliza modelos de lenguaje avanzados para proporcionar asistencia inteligente y contextual en diversos dominios.",
      naturalConversations: "Conversaciones Naturales",
      naturalConversationsDesc: "Participa en conversaciones fluidas y humanas con comprensión contextual y memoria.",
      multiModelIntelligence: "Inteligencia Multi-Modelo",
      multiModelIntelligenceDesc:
        "Combina modelos de DeepSeek y OpenAI para mejorar el razonamiento y la resolución de problemas.",
      codeAssistance: "Asistencia de Código",
      codeAssistanceDesc:
        "Obtén ayuda con tareas de programación, depuración y documentación técnica en múltiples lenguajes.",
      enterpriseSecurity: "Seguridad de Nivel Empresarial",
      enterpriseSecurityDesc:
        "Tus datos permanecen privados con encriptación de extremo a extremo, procesamiento seguro y cumplimiento de estándares de la industria.",
      technology: "Tecnología",
      cuttingEdgeTech: "Construido con Tecnología de Vanguardia",
      techDescription:
        "Boyscout IA combina las mejores tecnologías para ofrecer una experiencia de asistente de IA potente y confiable.",
      deepSeekDesc: "Modelos de lenguaje avanzados para razonamiento complejo y conocimiento especializado.",
      openAIDesc:
        "Procesamiento de lenguaje de última generación para conversaciones naturales y generación de contenido.",
      pythonDesc: "Infraestructura backend robusta con potentes capacidades de procesamiento de datos e IA.",
      angularDesc: "Frontend dinámico y responsivo para interacciones y experiencias de usuario fluidas.",
      reactDesc:
        "Biblioteca basada en componentes para crear interfaces de usuario interactivas con un DOM virtual para un rendimiento óptimo.",
      nextjsDesc:
        "Framework de React que permite renderizado del lado del servidor y generación de sitios estáticos para mejorar el rendimiento y SEO.",
      interactiveDemo: "Demo Interactiva",
      experienceBoyscout: "Experimenta Boyscout IA en Acción",
      demoDescription:
        "Prueba nuestra demo interactiva para ver cómo Boyscout IA puede ayudarte con tus preguntas, tareas y desafíos.",
      demoFeature1: "Haz preguntas complejas y obtén respuestas detalladas",
      demoFeature2: "Obtén ayuda con problemas de codificación y técnicos",
      demoFeature3: "Genera contenido creativo e ideas",
      demoFeature4: "Analiza datos y proporciona insights",
      startChatting: "Comienza a Chatear Ahora",
      aboutUs: "Sobre Nosotros",
      innovatingAI: "Innovando en Asistencia de IA desde Nueva York",
      aboutDescription:
        "Desde el corazón de la ciudad de Nueva York, nuestro equipo de investigadores, ingenieros y diseñadores de IA está dedicado a crear el asistente de IA más útil para empresas e individuos.",
      foundedIn:
        "Fundada en 2023, Boyscout IA reúne experiencia en aprendizaje automático, procesamiento de lenguaje natural y desarrollo de software para expandir los límites de lo que los asistentes de IA pueden hacer.",
      founders: "Nuestros Fundadores",
      meetOurTeam: "Conoce a Nuestro Equipo",
      readyToExperience: "¿Listo para Experimentar una Asistencia más Inteligente?",
      joinUsers: "Únete a miles de usuarios que ya se benefician de la asistencia inteligente de Boyscout IA.",
      startFreeTrial: "Comienza la Prueba Gratuita",
      scheduleDemo: "Programa una Demo",
      noCardRequired: "No se requiere tarjeta de crédito. Prueba gratuita de 14 días.",
      allRightsReserved: "Todos los derechos reservados.",
      terms: "Términos",
      privacy: "Privacidad",
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
            <span className="text-xl font-bold text-purple-900">Boyscout IA</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navFeatures}
            </Link>
            <Link href="#technology" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navTechnology}
            </Link>
            <Link href="#about" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navAbout}
            </Link>
            <Link href="#" className="text-sm font-medium text-slate-700 hover:text-purple-600">
              {t[language].navBlog}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <Link
              href="#"
              className="text-sm font-medium text-slate-700 hover:text-purple-600 hover:underline underline-offset-4 hidden sm:inline-block"
            >
              {t[language].signIn}
            </Link>
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="#demo">{t[language].tryDemo}</Link>
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
                    AI Assistant
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter text-purple-900 sm:text-5xl xl:text-6xl/none">
                    {t[language].heroTitle}
                  </h1>
                  <p className="max-w-[600px] text-slate-600 md:text-xl">{t[language].heroDescription}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                    <Link href="#demo">{t[language].tryForFree}</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    asChild
                  >
                    <Link href="#" className="flex items-center gap-1">
                      {t[language].learnMore} <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative lg:order-last">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aFX2YanolQKXPc11XjLUtq1gJvrMCy.png"
                  width={600}
                  height={600}
                  alt="Friendly AI Scout Robot"
                  className="relative mx-auto aspect-square overflow-hidden rounded-3xl object-contain object-center shadow-xl bg-[#0a192f]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  {t[language].features}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].intelligentAssistance}
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t[language].featuresDescription}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].naturalConversations}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].naturalConversationsDesc}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#" className="text-sm text-purple-600 flex items-center hover:text-purple-700">
                    {t[language].learnMore} <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Brain className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].multiModelIntelligence}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].multiModelIntelligenceDesc}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#" className="text-sm text-purple-600 flex items-center hover:text-purple-700">
                    {t[language].learnMore} <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm">
                <CardHeader>
                  <Code className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].codeAssistance}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].codeAssistanceDesc}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#" className="text-sm text-purple-600 flex items-center hover:text-purple-700">
                    {t[language].learnMore} <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <Shield className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-purple-900">{t[language].enterpriseSecurity}</CardTitle>
                  <CardDescription className="text-slate-600">{t[language].enterpriseSecurityDesc}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href="#" className="text-sm text-purple-600 flex items-center hover:text-purple-700">
                    {t[language].learnMore} <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
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
                  {t[language].technology}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].cuttingEdgeTech}
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t[language].techDescription}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-purple-100 bg-white shadow-sm flex flex-col items-center text-center p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AnR8qo2FbDvkzNiYYhQQk3Pzt2xIxe.png"
                  width={80}
                  height={80}
                  alt="DeepSeek Logo"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-purple-900">DeepSeek LLM</h3>
                <p className="text-sm text-slate-600 mt-2">{t[language].deepSeekDesc}</p>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm flex flex-col items-center text-center p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j10V9I8Pg6Y8VL201NZIulQDnckKMp.png"
                  width={80}
                  height={80}
                  alt="OpenAI & Microsoft Logo"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-purple-900">OpenAI</h3>
                <p className="text-sm text-slate-600 mt-2">{t[language].openAIDesc}</p>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm flex flex-col items-center text-center p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BzBzItlzwTVjU4jwwr7uHqj0fp9d9H.png"
                  width={80}
                  height={80}
                  alt="Python Logo"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-purple-900">Python</h3>
                <p className="text-sm text-slate-600 mt-2">{t[language].pythonDesc}</p>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm flex flex-col items-center text-center p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nkQnieKKLMb3ui0b8EZcWb5PqdmNws.png"
                  width={80}
                  height={80}
                  alt="Angular Logo"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-purple-900">Angular</h3>
                <p className="text-sm text-slate-600 mt-2">{t[language].angularDesc}</p>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm flex flex-col items-center text-center p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c41buWQJpVvPHjMhOAiJvM4UdfyXWT.png"
                  width={80}
                  height={80}
                  alt="React Logo"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-purple-900">React</h3>
                <p className="text-sm text-slate-600 mt-2">{t[language].reactDesc}</p>
              </Card>
              <Card className="border-purple-100 bg-white shadow-sm flex flex-col items-center text-center p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VcdInmwimlFzgQNbWqMdBgoli9dRaX.png"
                  width={80}
                  height={80}
                  alt="Next.js Logo"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold text-purple-900">Next.js</h3>
                <p className="text-sm text-slate-600 mt-2">{t[language].nextjsDesc}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="border-purple-200 text-purple-700">
                    {t[language].interactiveDemo}
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                    {t[language].experienceBoyscout}
                  </h2>
                  <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed">{t[language].demoDescription}</p>
                </div>
                <ul className="grid gap-2">
                  {[
                    t[language].demoFeature1,
                    t[language].demoFeature2,
                    t[language].demoFeature3,
                    t[language].demoFeature4,
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                    <Link href="#">{t[language].startChatting}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden border-2 border-purple-100 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 opacity-50"></div>
                <div className="relative p-6 md:p-8">
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4 ml-auto max-w-[80%]">
                    <p className="text-slate-700">How can Boyscout IA help my business?</p>
                  </div>
                  <div className="bg-purple-600 rounded-lg shadow-sm p-4 mb-4 max-w-[80%] text-white">
                    <p>
                      Boyscout IA can help your business by automating customer support, assisting with data analysis,
                      generating content, and providing insights from your business data. Our AI assistant integrates
                      with your existing tools and workflows to boost productivity and reduce operational costs.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4 ml-auto max-w-[80%]">
                    <p className="text-slate-700">Can you help with technical documentation?</p>
                  </div>
                  <div className="bg-purple-600 rounded-lg shadow-sm p-4 max-w-[80%] text-white">
                    <p>
                      I can help create, review, and improve technical documentation. I can generate code examples,
                      explain complex concepts in simple terms, and ensure your documentation is comprehensive and
                      user-friendly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About/Location Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="border-purple-300 text-purple-100">
                    {t[language].aboutUs}
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{t[language].innovatingAI}</h2>
                  <p className="max-w-[600px] text-purple-100 md:text-xl/relaxed">{t[language].aboutDescription}</p>
                </div>
                <div className="flex items-center gap-2 text-purple-100">
                  <MapPin className="h-5 w-5" />
                  <span>Manhattan, New York, NY</span>
                </div>
                <p className="text-purple-100">{t[language].foundedIn}</p>
                <div className="space-y-2 mt-4">
                  <h3 className="text-xl font-semibold">{t[language].founders}</h3>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-300" />
                      <span className="font-medium">Emanuel Jimenez</span>
                      <span className="text-purple-300">- Software Developer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-300" />
                      <span className="font-medium">Betsabe Jimenez</span>
                      <span className="text-purple-300">- Human Resources</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    variant="outline"
                    className="bg-transparent border-purple-300 text-white hover:bg-purple-800"
                    asChild
                  >
                    <Link href="#">{t[language].meetOurTeam}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aFX2YanolQKXPc11XjLUtq1gJvrMCy.png"
                  width={550}
                  height={550}
                  alt="Scout-AI Robot"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-contain object-center shadow-xl bg-[#0a192f]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-purple-900 md:text-4xl">
                  {t[language].readyToExperience}
                </h2>
                <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed">{t[language].joinUsers}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="#">{t[language].startFreeTrial}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  asChild
                >
                  <Link href="#">{t[language].scheduleDemo}</Link>
                </Button>
              </div>
              <p className="text-sm text-slate-500">{t[language].noCardRequired}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-purple-100 bg-white py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
            <p className="text-sm font-medium text-slate-700">
              © {new Date().getFullYear()} Boyscout IA. {t[language].allRightsReserved}
            </p>
          </div>
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
      </footer>
    </div>
  )
}

