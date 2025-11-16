'use client'

import DashboardLayout from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Button } from '@/components/button'
import { mockChildren, safeZones, deviceBatteryInfo, deviceFeatures } from '@/lib/mockData'
import { formatTime, formatDateTime } from '@/lib/utils'
import { MapPin, Smartphone, Navigation, Activity, Clock, Battery, Wifi, Signal, Cpu, HardDrive } from 'lucide-react'

export default function Profiles() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Samsung Galaxy A33 Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Live-Standorte, Geräte-Status und Batterie-Info
          </p>
        </div>

        {/* Live Map Placeholder */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-primary/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Live GPS Karte
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Route
                </Button>
                <Button size="sm">
                  Vollbild
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-12 text-center border-2 border-dashed relative overflow-hidden">
              {/* Map background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-8 gap-4 h-full">
                  {[...Array(32)].map((_, i) => (
                    <div key={i} className="border-r border-b border-gray-400" />
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <MapPin className="h-20 w-20 mx-auto text-primary mb-4 animate-bounce" />
                <p className="text-lg font-semibold mb-2">Google Maps / Mapbox Integration</p>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Echtzeit GPS-Tracking mit hoher Genauigkeit dank Samsung Galaxy A33 Multi-Satelliten-Navigation
                  (GPS, GLONASS, GALILEO, BDS)
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  {mockChildren.map((person) => (
                    <div key={person.id} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-primary/20">
                      <img src={person.avatar} alt={person.name} className="h-8 w-8 rounded-full border-2 border-primary" />
                      <span className="font-medium text-sm">{person.name}</span>
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partner Cards with Samsung Details */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockChildren.map((person) => {
            const batteryInfo = deviceBatteryInfo.find(b => b.deviceId === person.devices[0]?.id)

            return (
              <Card key={person.id} className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={person.avatar} 
                        alt={person.name}
                        className="h-20 w-20 rounded-full border-4 border-primary"
                      />
                      <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                        <Signal className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{person.name}</CardTitle>
                      <p className="text-sm text-green-500 font-medium mt-1">
                        ● Online • 5G Connected
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Samsung Galaxy A33 5G
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Location */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-blue-500 rounded-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-1">📍 GPS Position</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {person.location?.address}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="bg-white dark:bg-gray-800 p-2 rounded">
                            <p className="text-xs text-muted-foreground">Latitude</p>
                            <p className="text-sm font-mono font-semibold">{person.location?.lat.toFixed(6)}°</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-2 rounded">
                            <p className="text-xs text-muted-foreground">Longitude</p>
                            <p className="text-sm font-mono font-semibold">{person.location?.lng.toFixed(6)}°</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Navigation className="h-3 w-3" />
                          Genauigkeit: ±5m • GPS/GLONASS/GALILEO
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Zuletzt: {formatDateTime(person.location?.timestamp || new Date())}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Navigation className="h-3 w-3 mr-2" />
                        Navigation starten
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MapPin className="h-3 w-3 mr-2" />
                        Standort teilen
                      </Button>
                    </div>
                  </div>

                  {/* Device Status */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-4">
                      <Smartphone className="h-5 w-5 text-purple-500" />
                      <span className="font-semibold text-lg">Gerätestatus</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Battery */}
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Battery className={`h-5 w-5 ${batteryInfo && batteryInfo.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} />
                          <p className="text-xs text-muted-foreground">Akku</p>
                        </div>
                        <p className="text-2xl font-bold">{batteryInfo?.batteryLevel}%</p>
                        <p className="text-xs text-muted-foreground">
                          {batteryInfo?.isCharging ? '⚡ Lädt (5000 mAh)' : '5000 mAh'}
                        </p>
                      </div>

                      {/* Signal */}
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Signal className="h-5 w-5 text-green-500" />
                          <p className="text-xs text-muted-foreground">Signal</p>
                        </div>
                        <p className="text-2xl font-bold">5G</p>
                        <p className="text-xs text-green-500">Exzellent</p>
                      </div>

                      {/* WiFi */}
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Wifi className="h-5 w-5 text-blue-500" />
                          <p className="text-xs text-muted-foreground">WLAN</p>
                        </div>
                        <p className="text-2xl font-bold">WiFi 6</p>
                        <p className="text-xs text-blue-500">Verbunden</p>
                      </div>

                      {/* GPS */}
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-green-500" />
                          <p className="text-xs text-muted-foreground">GPS</p>
                        </div>
                        <p className="text-2xl font-bold">ON</p>
                        <p className="text-xs text-green-500">±5m genau</p>
                      </div>
                    </div>
                  </div>

                  {/* Device Specs */}
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Hardware</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Display:</span>
                        <span className="font-medium">6.4" AMOLED</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RAM:</span>
                        <span className="font-medium">6GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">128GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">OS:</span>
                        <span className="font-medium">Android 13</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg text-center">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">{formatTime(person.usedScreenTime)}</p>
                      <p className="text-xs text-muted-foreground">Heute aktiv</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg text-center">
                      <Activity className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-xs text-muted-foreground">Erreichbar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Safe Zones */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Sichere Zonen & Geofencing
              </CardTitle>
              <Button>
                <MapPin className="h-4 w-4 mr-2" />
                Neue Zone
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {safeZones.map((zone) => (
                <div key={zone.id} className="p-4 border-2 rounded-lg hover:border-primary transition-colors" style={{ borderColor: zone.color + '40' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: zone.color }} />
                    <p className="font-semibold">{zone.name}</p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Navigation className="h-3 w-3" />
                      Radius: {zone.radius}m
                    </p>
                    <p className="text-xs font-mono">
                      {zone.lat.toFixed(4)}, {zone.lng.toFixed(4)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Auf Karte
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Samsung Knox Security Info */}
        <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🛡️ Samsung Knox Sicherheit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ihre Standort- und Gerätedaten sind durch Samsung Knox geschützt - eine mehrschichtige Sicherheitsplattform auf Hardware- und Softwareebene.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-start gap-2">
                <div className="p-1 bg-green-500 rounded">
                  <Activity className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Verschlüsselte Daten</p>
                  <p className="text-xs text-muted-foreground">Ende-zu-Ende</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-1 bg-green-500 rounded">
                  <Activity className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Secure Boot</p>
                  <p className="text-xs text-muted-foreground">Hardware-Level</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="p-1 bg-green-500 rounded">
                  <Activity className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">TrustZone</p>
                  <p className="text-xs text-muted-foreground">Isolierte Umgebung</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
