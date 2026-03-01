export const metadata = {
  title: "Schengen Bot",
  description: "Vize arama sistemi"
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}