'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/button'
import { MapPin } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">CoupleTracker</h1>
          <p className="text-muted-foreground mt-2">
            Live-Standortverfolgung für Paare
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="name@beispiel.de"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Anmelden
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>Demo-Modus: Beliebige Zugangsdaten verwenden</p>
        </div>

        <div className="pt-6 border-t space-y-2 text-sm text-center text-muted-foreground">
          <p>📍 Live GPS-Tracking</p>
          <p>📱 Geräteüberwachung</p>
          <p>🔔 Standort-Benachrichtigungen</p>
          <p>📊 Aktivitätsberichte</p>
        </div>
      </div>
    </div>
  )
}
