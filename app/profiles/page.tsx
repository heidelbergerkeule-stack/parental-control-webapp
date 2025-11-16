'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { mockChildren } from '@/lib/mockData'
import { formatTime, calculatePercentage } from '@/lib/utils'
import { Plus, Edit, Trash2, Smartphone, MapPin } from 'lucide-react'

export default function Profiles() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Kinder Profile</h1>
            <p className="text-muted-foreground mt-1">
              Verwalten Sie Profile und Einstellungen für jedes Kind
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neues Profil
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockChildren.map((child) => (
            <Card key={child.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img 
                      src={child.avatar} 
                      alt={child.name}
                      className="h-16 w-16 rounded-full border-2 border-primary"
                    />
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{child.age} Jahre</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Bildschirmzeit</span>
                    <span className="font-semibold">
                      {formatTime(child.usedScreenTime)} / {formatTime(child.screenTimeLimit)}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${calculatePercentage(child.usedScreenTime, child.screenTimeLimit)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{child.devices.length} Geräte</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {child.devices.map((device) => (
                      <div 
                        key={device.id}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs"
                      >
                        <div className={`h-2 w-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {device.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Aktueller Standort</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {child.location?.address}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-destructive">{child.blockedApps.length}</p>
                      <p className="text-xs text-muted-foreground">Blockierte Apps</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-destructive">{child.blockedWebsites.length}</p>
                      <p className="text-xs text-muted-foreground">Blockierte Seiten</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Profil bearbeiten
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Add New Profile Card */}
          <Card className="border-dashed border-2 flex items-center justify-center min-h-[400px] cursor-pointer hover:bg-accent transition-colors">
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Neues Profil anlegen</h3>
              <p className="text-sm text-muted-foreground">
                Fügen Sie ein weiteres Kinderprofil hinzu
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
