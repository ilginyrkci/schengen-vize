import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Schengen Bot",
  description: "Vize arama sistemi",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#0b1120',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#0b1120',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}