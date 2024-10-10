import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl">
            Estamos aquí para ayudarte con cualquier pregunta o solicitud
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Completa el formulario y te responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre completo" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Información de contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Phone className="text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-primary" />
                  <span>info@autorent.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-primary" />
                  <span>123 Calle Principal, Ciudad, CP 12345</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-primary" />
                  <span>Lun - Vie: 9am - 6pm, Sáb: 10am - 4pm</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nuestra ubicación</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Mapa de ubicación"
                  width={400}
                  height={300}
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Síguenos en redes sociales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Link href="#" className="text-primary hover:text-primary/80">
                    <span className="sr-only">Facebook</span>
                    <Facebook size={24} />
                  </Link>
                  <Link href="#" className="text-primary hover:text-primary/80">
                    <span className="sr-only">Twitter</span>
                    <Twitter size={24} />
                  </Link>
                  <Link href="#" className="text-primary hover:text-primary/80">
                    <span className="sr-only">Instagram</span>
                    <Instagram size={24} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
