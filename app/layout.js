import './globals.css'
import { ThemeProvider } from './ThemeProvider'
import themeScript from './theme-script'

export const metadata = {
  title: 'Gilber Garcia',
  description: 'Personal blog by Gilber Garcia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}