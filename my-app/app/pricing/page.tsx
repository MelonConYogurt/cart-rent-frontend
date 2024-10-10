"use client";

import {Check, HelpCircle, X} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"daily" | "weekly">(
    "daily"
  );

  const pricingPlans = [
    {
      name: "Económico",
      description: "Perfecto para viajes cortos y económicos",
      price: billingPeriod === "daily" ? 29.99 : 179.99,
      features: [
        "Vehículos compactos",
        "Kilometraje limitado",
        "Seguro básico",
        "Asistencia en carretera",
      ],
      notIncluded: [
        "GPS incluido",
        "Sillas para niños",
        "Conductor adicional gratis",
      ],
    },
    {
      name: "Estándar",
      description: "Ideal para viajes familiares y de negocios",
      price: billingPeriod === "daily" ? 49.99 : 299.99,
      features: [
        "Vehículos medianos o SUV pequeñas",
        "Kilometraje ilimitado",
        "Seguro completo",
        "Asistencia en carretera",
        "GPS incluido",
      ],
      notIncluded: ["Sillas para niños", "Conductor adicional gratis"],
    },
    {
      name: "Premium",
      description: "La mejor experiencia para viajes de lujo",
      price: billingPeriod === "daily" ? 79.99 : 479.99,
      features: [
        "Vehículos de lujo o SUV grandes",
        "Kilometraje ilimitado",
        "Seguro completo",
        "Asistencia en carretera premium",
        "GPS incluido",
        "Sillas para niños",
        "Conductor adicional gratis",
      ],
      notIncluded: [],
    },
  ];

  const faqs = [
    {
      question: "¿Qué documentos necesito para alquilar un auto?",
      answer:
        "Necesitarás una licencia de conducir válida, una tarjeta de crédito a tu nombre y un documento de identidad. Para conductores internacionales, se requiere un permiso de conducir internacional.",
    },
    {
      question: "¿Hay un límite de edad para alquilar?",
      answer:
        "Sí, la edad mínima para alquilar es de 21 años. Los conductores menores de 25 años pueden estar sujetos a un cargo adicional por conductor joven.",
    },
    {
      question: "¿Puedo cancelar mi reserva?",
      answer:
        "Sí, puedes cancelar tu reserva sin cargo hasta 48 horas antes de la fecha de recogida. Las cancelaciones posteriores pueden estar sujetas a una tarifa.",
    },
    {
      question: "¿Está incluido el seguro en el precio?",
      answer:
        "El seguro básico está incluido en todos nuestros planes. Para una cobertura más completa, ofrecemos opciones de seguro adicionales que puedes agregar a tu reserva.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Planes de Alquiler Flexibles
          </h1>
          <p className="text-xl mb-8">
            Elige el plan que mejor se adapte a tus necesidades de viaje
          </p>
          <div className="inline-flex items-center bg-primary-foreground rounded-full p-1">
            <Button
              variant={billingPeriod === "daily" ? "secondary" : "ghost"}
              onClick={() => setBillingPeriod("daily")}
              className="rounded-full"
            >
              Diario
            </Button>
            <Button
              variant={billingPeriod === "weekly" ? "secondary" : "ghost"}
              onClick={() => setBillingPeriod("weekly")}
              className="rounded-full"
            >
              Semanal
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={index === 1 ? "border-primary shadow-lg" : ""}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">
                  ${plan.price.toFixed(2)}{" "}
                  <span className="text-lg font-normal text-muted-foreground">
                    / {billingPeriod === "daily" ? "día" : "semana"}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-muted-foreground"
                    >
                      <X className="text-red-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Seleccionar Plan</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Preguntas Frecuentes
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="text-center bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="mb-8">
            Nuestro equipo de atención al cliente está listo para ayudarte a
            encontrar el plan perfecto para tu viaje.
          </p>
          <Button asChild>
            <Link href="/contacto">
              <HelpCircle className="mr-2 h-4 w-4" /> Contáctanos
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
