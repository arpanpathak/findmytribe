import { type ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingCreateEventButton from '../components/FloatingCreateEventButton'
import { useNavigate } from 'react-router-dom'

export default function MainLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
      <FloatingCreateEventButton onClick={() => navigate('/create-event')} />
    </div>
  )
}
