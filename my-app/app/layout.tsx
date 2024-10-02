/* eslint-disable @next/next/no-img-element */
import type {Metadata} from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <nav className="flex justify-end  bg-gray-900 text-slate-50 h-12 hover:text-white">
            <ul className="flex gap-5 justify-center items-center mx-10">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/cars">Cars</a>
              </li>
              <li>
                <a href="/pricing">Pricing</a>
              </li>
              <li>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </li>
              <li>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </nav>

          {children}

          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Sobre nosotros</h3>
                  <p className="text-sm">
                    Somos tu mejor opción para alquilar vehículos de calidad a
                    precios competitivos.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Enlaces rápidos
                  </h3>
                  <ul className="text-sm">
                    <li className="mb-2">
                      <a href="#" className="hover:underline">
                        Inicio
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="hover:underline">
                        Vehículos
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="hover:underline">
                        Reservas
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#" className="hover:underline">
                        Contacto
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                  <p className="text-sm mb-2">Teléfono: (123) 456-7890</p>
                  <p className="text-sm mb-2">Email: info@tualquiler.com</p>
                  <p className="text-sm">
                    Dirección: Calle Principal 123, Ciudad
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
                  <div className="flex space-x-4"></div>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
                <p>
                  &copy; 2024 Tu Empresa de Alquiler de Autos. Todos los
                  derechos reservados.
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
