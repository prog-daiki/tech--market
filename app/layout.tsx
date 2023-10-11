import Navbar from '@/components/navbar/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LoginModalProvider } from '@/providers/login-modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'
import { RegisterModalProvider } from '@/providers/register-modal-provider'
import getCurrentUser from './actions/get-current-user'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'tech market',
  description: 'tech market',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RegisterModalProvider />
        <LoginModalProvider />
        <Navbar currentUser={currentUser!} />
        <div className='pt-20'>
          {children}
        </div>
      </body>
    </html>
  )
}
