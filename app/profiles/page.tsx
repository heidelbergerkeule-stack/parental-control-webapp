'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { mockChildren, safeZones } from '@/lib/mockData'
import { formatTime, formatDateTime } from '@/lib/utils'
import { MapPin, Smartphone, Navigation, Activity, Clock, Map as MapIcon } from 'lucide-react'

export default function Profiles() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Partner Profile</h1>
          <p className="text-muted-foreground mt-1">
            Standorte, Geräte und Aktivitäten
          </p>
        </div>

        {/* Live Map Placeholder */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="h-5 w-5" />
                Live Karte
              </CardTitle>
              <Button>
                Vollbild
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 text-center border-2 border-dashed">
              <MapPin className="h-16 w-16 mx-auto text-primary mb-4" />
              <p className="text-lg font-semibold mb-2">Interaktive Karte</p>
              <p className="text-sm text-muted-foreground mb-4">
                Integration mit Google Maps oder Mapbox für Echtzeit-Standortverfolgung
              </p>
              <div className="flex gap-4 justify-center">
                {mockChildren.map((person) => (
                  <div key={person.id} className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                    <img src={person.avatar} alt={person.name} className="h-6 w-6 rounded-full" />
                    <span className="font-medium text-sm">{person.name}</span>
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partner Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockChildren.map((person) => (
            <Card key={person.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={person.avatar} 
                      alt={person.name}
                      className="h-20 w-20 rounded-full border-4 border-primary"
                    />
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                      <Activity className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{person.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {person.age} Jahre • Online
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Location */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Aktueller Standort</p>
                      <p className="text-sm text-muted-foreground">
                        {person.location?.address}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="text-xs text-muted-foreground">
                          <p>Lat: {person.location?.lat.toFixed(4)}</p>
                          <p>Lng: {person.location?.lng.toFixed(4)}</p>
                        </div>
                        <div className="flex-1" />
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(person.location?.timestamp || new Date())}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Navigation className="h-3 w-3 mr-2" />
                      Navigation
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MapPin className="h-3 w-3 mr-2" />
                      Teilen
                    </Button>
                  </div>
                </div>

                {/* Devices */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">Verbundene Geräte</span>
                  </div>
                  <div className="space-y-2">
                    {person.devices.map((device) => (
                      <div 
                        key={device.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          device.status === 'online' 
                            ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' 
                            : 'bg-secondary border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${device.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                          <div>
                            <p className="font-medium text-sm">{device.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{device.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium capitalize">{device.status}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(device.lastActive)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{formatTime(person.usedScreenTime)}</p>
                    <p className="text-xs text-muted-foreground">Heute aktiv</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg text-center">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{person.devices.length}</p>
                    <p className="text-xs text-muted-foreground">Geräte</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safe Zones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Sichere Zonen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {safeZones.map((zone) => (
                <div key={zone.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <p className="font-semibold">{zone.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Radius: {zone.radius}m
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {zone.lat.toFixed(4)}, {zone.lng.toFixed(4)}
                  </p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Neue Zone hinzufügen
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
