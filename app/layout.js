import './globals.css'

export const metadata = {
  title: 'Gilbert Garcia',
  description: 'Personal blog by Gilbert Garcia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}