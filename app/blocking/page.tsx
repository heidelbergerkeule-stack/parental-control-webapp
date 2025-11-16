'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { mockChildren } from '@/lib/mockData'
import { Shield, Plus, X, Search } from 'lucide-react'

const popularApps = [
  '📱 TikTok', '📷 Instagram', '👻 Snapchat', '📺 YouTube', '🎮 Fortnite',
  '💬 WhatsApp', '🎵 Spotify', '🎮 Roblox', '📘 Facebook', '🐦 Twitter'
]

const popularWebsites = [
  'facebook.com', 'instagram.com', 'tiktok.com', 'youtube.com', 'twitch.tv',
  'reddit.com', 'twitter.com', 'netflix.com', 'discord.com', 'snapchat.com'
]

export default function Blocking() {
  const [selectedChild, setSelectedChild] = useState(mockChildren[0].id)
  const child = mockChildren.find(c => c.id === selectedChild)!

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Apps & Webseiten blockieren</h1>
          <p className="text-muted-foreground mt-1">
            Kontrollieren Sie den Zugriff auf Anwendungen und Websites
          </p>
        </div>

        {/* Child Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Profil auswählen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {mockChildren.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChild(c.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    selectedChild === c.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img src={c.avatar} alt={c.name} className="h-8 w-8 rounded-full" />
                  <span className="font-medium">{c.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Blocked Apps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blockierte Apps</CardTitle>
                  <CardDescription>{child.blockedApps.length} Apps blockiert</CardDescription>
                </div>
                <Shield className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {child.blockedApps.map((app) => (
                  <div key={app} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                    <span className="font-medium">{app}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Beliebte Apps</p>
                <div className="grid grid-cols-2 gap-2">
                  {popularApps.map((app) => (
                    <Button key={app} variant="outline" size="sm" className="justify-start">
                      <Plus className="h-3 w-3 mr-2" />
                      {app}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="App-Name eingeben..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blocked Websites */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blockierte Webseiten</CardTitle>
                  <CardDescription>{child.blockedWebsites.length} Seiten blockiert</CardDescription>
                </div>
                <Shield className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {child.blockedWebsites.map((website) => (
                  <div key={website} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                    <span className="font-medium">{website}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Beliebte Webseiten</p>
                <div className="grid grid-cols-1 gap-2">
                  {popularWebsites.map((website) => (
                    <Button key={website} variant="outline" size="sm" className="justify-start">
                      <Plus className="h-3 w-3 mr-2" />
                      {website}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Website-URL eingeben..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Filtering */}
        <Card>
          <CardHeader>
            <CardTitle>Inhaltsfilter</CardTitle>
            <CardDescription>Altersgerechte Filtereinstellungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Gewalt & Gore</p>
                  <p className="text-sm text-muted-foreground">Blockiert gewalthaltige Inhalte</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Explizite Inhalte</p>
                  <p className="text-sm text-muted-foreground">Blockiert unangemessene Inhalte</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Glücksspiel</p>
                  <p className="text-sm text-muted-foreground">Blockiert Glücksspiel-Webseiten</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Social Media</p>
                  <p className="text-sm text-muted-foreground">Beschränkt soziale Netzwerke</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
