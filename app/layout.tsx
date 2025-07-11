import './globals.css'

export const metadata = {
  title: 'Regiovoorlichtingen.nl - Onafhankelijke studiekeuze-informatie',
  description: 'Onafhankelijke informatie, betrouwbare bronnen en regionale voorlichtingssessies. Content en context voor de juiste studiekeuze.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <script 
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}