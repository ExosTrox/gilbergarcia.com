import './globals.css'
import { ThemeProvider } from './ThemeProvider'
import themeScript from './theme-script'

export const metadata = {
  title: 'Gilber Garcia',
  description: 'Personal blog by Gilber Garcia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}